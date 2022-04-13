// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenUJG.sol";

/**
*   @title `Ujap students` game full solidity nft contract
*   @dev Full implementation of an ERC721, VRFConsumerBase, Ownable, Strings contracts
*/

contract StudentsNft is ERC721, VRFConsumerBase{
    
    // Token Contract
    TokenUJG public tokenUJG;
    
    // Random Nft Names
    string[] private names  = ["Temis", "Jekatherina", "Hernandez","Gabriel","Maria","Juan","Maru",
           "Sebastian", "Kevin", "Caranfa", "Julio", "Sammer", "Edkar",
           "Quintero", "Ochado", "Francisco", "Diego", "Cristian", "Luis",
           "Gocho", "Lopez" , "Marcel" , "Kristofer" , "Simet" , "Manguito"];

    /**
    *   @dev Data nft structure to the game
    *   `level` character level
    *   `intelligenceLevel` intelligence character stat
    *   `cheatLevel` cheat character stat
    *   `attackTime` is the rest time that take the nft for his next attack round
    *   `random` selected randomly
    *   
    *   `intelligenceLevel`, `cheatLevel` & `name` are selected randomly
    *
    *   Requirements:
    * - `level` stat cannot be zero and this just can take 3 values (1,2,3) 
    * - `intelligenceLevel` stat cannot be zero and the final value deppend of the `level` stat
    * but this is just a buff MIN value 1, Max value 300
    * - `cheatLevel` stat cannot be zero MIN value 1, MAX value 100
    */
    struct Student{
        uint256 level;
        uint256 intelligenceLevel;
        uint256 cheatLevel;
        string name;
        uint32 attackTime;
    }

    // Array that save all the characters
    Student[] public students;

    // Mapping from the owner to the amount of nft students
    mapping(address => uint256) public nftOwnerCount;
    
    // Mapping from the owner to the nft
    mapping(uint256 => address ) public nftToOwner;

    // User that request of the random
    mapping(bytes32 => address) private requestToSender;

    //  Data random number from the user
    mapping(address => uint256) public userRandomNumber;

    /**
    *   @dev kovan default blockhain implementation
    *   `_keyhash` kovan default = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
    *   `_fee` kovan default = 100000000000000000
    *   `_VRFCoordinator` = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
    *   `_linkToken` = 0xa36085F69e2889c224210F603D836748e7dC0088
    */
    bytes32 internal keyhash;

    uint256 internal fee;

    uint32 internal coolDownTime;

    address internal owner;
    
    constructor(
        address _VRFCoordinator, 
        address _linkToken, 
        bytes32 _keyhash,  
        address _tokenAddress
    ) public 
    VRFConsumerBase(_VRFCoordinator, _linkToken) 
    ERC721("Ujapista","UJAP")
    {
        keyhash = _keyhash;
        fee = 0.1 * 10**18;
        coolDownTime = 1 days;
        owner = msg.sender;
        tokenUJG = TokenUJG(_tokenAddress);
    }

    /**
    *   @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /**
    *   @dev just the owner of the nft: `_StudentId` can interact with the function    
    */
    modifier onlyOwnerOf(uint256 _StudentId) {
        require(msg.sender == nftToOwner[_StudentId],"U aren't the nft Owner");
        _;
    }

    modifier EnoughToken(address account, uint256 amount){
        require(tokenUJG.getBalance(account) >= amount,"Not enough UJG");
        _;
    }

    /**
    *   @dev get request {VRFConsumerBase - requestRandomness}
    *   Kovan LinktToken Faucet: https://faucets.chain.link
    *
    *   Requirements:
    *
    * - Min user Link token balance 0.1
    */
    function requestRandomness() public returns (bytes32) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill the contract with faucet");       

        bytes32 requestId = requestRandomness(keyhash, fee);

        requestToSender[requestId] = msg.sender;
        userRandomNumber[msg.sender] = 432423432432;

        return requestId;
    }

    /**
    * @dev save the random number `userRandomNumber`
    * internal override {VRFConsumerBase - fulfillRandomness  }
    */
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) 
    internal override {
        userRandomNumber[requestToSender[requestId]] = randomNumber;
    }

    /**
    *   @dev Mint a nft and associate with the owner
    *   get the `newId` from the students array length take the random number and generate the stats
    *   and save it
    */
    function createNftStudent() public EnoughToken(msg.sender,100){
        tokenUJG.TransferToken(msg.sender, address(this), 100);
        uint256 newId = students.length;
        uint256 randomNumber = userRandomNumber[msg.sender];

        // Generating character stats...
        uint256 level = (randomNumber % 3) + 1;
        uint256 intelligenceLevel = 0;
        if(level == 1){
            intelligenceLevel = (randomNumber % 100) + 1;
        }else if(level == 2){
            intelligenceLevel = (randomNumber % 100) + 101;
        }else{
            intelligenceLevel = (randomNumber % 100) + 201;
        }
        uint256 cheatLevel = ((randomNumber * 50) % 100) + 1;
        string memory name = names[randomNumber % 25];

        // Saving the character...
        students.push(
            Student(
                level,
                intelligenceLevel,
                cheatLevel,
                name,
                uint32 (now + coolDownTime)

            )
        );

        /**
        *   @dev increase the `nftOwnerCount` because we got a new nft
        *   associated the mapping with `newId`: NftId with the owner
        *   _safeMint function call
        *
        *   Requirements:
        * - github {ERC720 - _safeMint}
        */
        nftOwnerCount[msg.sender]++;

        nftToOwner[newId] = msg.sender;

        _safeMint(msg.sender, newId);
    }

    /**
    *   @dev function that wear the nft 
    */
    function _wear(Student memory _student, uint256 _wearIntelligence) internal{
        if ((_student.intelligenceLevel - _wearIntelligence) < 0){
            _student.intelligenceLevel = 0;
        }else{
            _student.intelligenceLevel -= _wearIntelligence;
        }
    }

    /**
    *   @dev Change the CoolDownTime value 
    */
    function setCoolDownTime(uint32 _coolDownTime) public onlyOwner(){
        coolDownTime = _coolDownTime;
    }

    /**
    *   @dev function that get the nft and attack the level
    * 
    *   Requirements:
    * 
    * - The `_levelNumber` cannot be a value below than 1 an upper than 10
    * - The stat of `_intelligenceLevel` from `Student` need to be greater than 0
    */

    function attack(uint256 _StudentId, uint256 _levelNumber) 
    public 
    onlyOwnerOf(_StudentId) 
    EnoughToken(msg.sender, (10 * _levelNumber))
    returns(bool){
        require((_levelNumber >= 1 && _levelNumber <= 10), "Invalid Level");

        Student memory student = students[_StudentId];

        require(student.intelligenceLevel > 0);

        requestRandomness();

        /**
        *   @dev `basePowerLevel` MIN value 40 and MAX value 400
        *   your stats and your random roll going to be evaluated
        *   if win ur wear it`s gonna be minus than if u losse, you request a random number,
        *   after that, thath go to trigger the cooldown function   
        */

        uint256 basePowerLevel = 40 * _levelNumber;

        uint256 roll = (userRandomNumber[msg.sender] % 100) + 1 ; 

        uint256 totalAttackPower = roll + student.cheatLevel + student.intelligenceLevel;

        _triggerCooldown(student);

        tokenUJG.TransferToken(msg.sender, address(this) , (10*_levelNumber));

        if( basePowerLevel <= totalAttackPower){
            uint256 wear = (basePowerLevel/20)*2;
            _wear(student,wear);
            tokenUJG.TransferToken(address(this), msg.sender , (20*_levelNumber));
            return(true);
        }
        uint256 wear = (basePowerLevel/10)*2;
        _wear(student,wear);
        return(false);
    }

    /**
    *   @dev Restart the character Cooldown attack
    */
    function _triggerCooldown(Student memory _student) internal {
        _student.attackTime = uint32(now + coolDownTime);
    }

    /** 
    *   @dev get the URI from the NFT Tokem
    *
    *   Requirements: 
    *   
    *   - Only the owner of the token can doit
    */
    function getTokenURI(uint256 _StudentId) 
    public view onlyOwnerOf(_StudentId) 
    returns(string memory)  {
        return tokenURI(_StudentId);
    }

    /** 
    *   @dev get the URI from the NFT Tokem
    *
    *   Requirements: 
    *   
    *   - Only the owner of the token can doit
    */
    function setTokenURI(uint256 _StudentId, string memory _tokenURI) 
    public onlyOwnerOf(_StudentId){
        _setTokenURI(_StudentId, _tokenURI);
    }
}