// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenUJG.sol";
import "./Ownable.sol";

/**
*   @title `Ujap students` game full solidity nft contract
*   @dev Full implementation of an ERC721, VRFConsumerBase, Ownable, Strings contracts
*   
*   Description:
*
*   Project made for the presentation of a university thesis, based on the studies 
*   and databases of the blockchain to create a game, made to be run on Kovan Test 
*   Blockchain, Local Blockchain and Main Ethereum Blockchain.
*
*   This contract (StudentsNft) contains all the elements for the construction and operation of the NFT
*   
*   Author: https://github.com/simetb
*   
*   
*/

contract StudentsNft is Ownable,ERC721, VRFConsumerBase{
    
    // Token Contract
    TokenUJG internal _tokenUJG;

    // Amount of tokens in contract
    uint256 internal _tokenPool;

    /**
    *   @dev Data nft structure to the game
    *   `level` character level
    *   `intelligenceLevel` intelligence character stat
    *   `cheatLevel` cheat character stat
    *   `attackTime` is the rest time that take the nft for his next attack round
    *   `random` selected randomly
    *   `id` The NFT Id
    *   `win` To check if the nft recently win
    *   `market` To check if the nft is in the market 
    *   
    *   `intelligenceLevel`, `cheatLevel` & `name` are selected randomly
    *
    *   Requirements:
    * - `level` stat cannot be zero and this just can take 3 values (1,2,3) 
    * - `intelligenceLevel` stat cannot be zero and the final value deppend of the `level` stat
    *   but this is just a buff MIN value 1, Max value 300
    * - `cheatLevel` stat cannot be zero MIN value 1, MAX value 100
    */
    struct Student{
        uint256 level;
        uint256 intelligenceLevel;
        uint256 cheatLevel;
        string name;
        uint32 attackTime;
        uint256 id;
        bool market;
        uint256 price;
    }

    // Cooldown Attack of the NFT
    uint32 internal _coolDownTime;

    // Id of the NFT
    uint256 private _nftId;

    // Random Nft Names
    string[] private _names  = ["Temis", "Jekatherina", "Hernandez","Gabriel","Maria","Juan","Maru",
           "Sebastian", "Kevin", "Caranfa", "Julio", "Sammer", "Edkar",
           "Quintero", "Ochado", "Francisco", "Diego", "Cristian", "Luis",
           "Gocho", "Lopez" , "Marcel" , "Kristofer" , "Simet" , "Manguito"];

    // Array that save all the characters
    Student[] internal _students;
    
    /** 
    *   @dev Variable mapping for the correct control and distribution of prizes and NFT
    */
    // Mapping from the owner to the amount of nft students
    mapping(address => uint256) internal _nftOwnerCount;
    
    // Mapping from the owner to the nft
    mapping(uint256 => address ) internal _nftToOwner;

    // User that request of the random
    mapping(bytes32 => address) private _requestToSender;

    //  Data random number from the user
    mapping(address => uint256) internal _userRandomNumber;
    
    // Mapping the victory
    mapping(uint256 => bool) internal _winState;

    /** 
    *   @dev Events that are used to deploy events in js with the contract
    */
    // Event that get the result of the Attack
    event ResultAttack(bool win, uint256 powerCharacter, uint256 powerLevel, uint256 wear, uint256 roll, uint256 reward);

    // Evemt that get the created nft and their stats
    event NftCreated(string name, uint256 level, uint256 intelligenceLevel, uint256 cheatLevel); 

    /** 
    *   @dev The control variables are used to adjust the prices, 
    *   prizes and consequences that the nfts bring if necessary.
    */
    // Control the price for the NFT mint function 
    uint256 private _nftPrice;

    // Control Wear Variable
    uint256 private _wearMultiplicator;

    // Control Attack Variable
    uint256 private _attackPriceMultiplicator;

    // Control Reward Variables
    uint256 private _rewardPriceMultiplicator;

    // Control Total NFT in Game
    uint256 internal _nftsInGame;
    
    /**
    *   @dev Kovan Default Blockhain Implementation
    *   `_keyhash` kovan default = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
    *   `_fee` kovan default = 100000000000000000
    *   `_VRFCoordinator` = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
    *   `_linkToken` = 0xa36085F69e2889c224210F603D836748e7dC0088
    */
    bytes32 internal keyhash;

    uint256 internal fee;
    
    constructor(
        address _VRFCoordinator, 
        address _linkToken, 
        bytes32 _keyhash,  
        address _tokenAddress,
        uint256 nftPrice,
        uint256 wearMultiplicator,
        uint256 attackMultiplicator,
        uint256 rewardPriceMultiplicator
    ) public 
    Ownable()
    VRFConsumerBase(_VRFCoordinator, _linkToken) 
    ERC721("Ujapista","UJAP")
    {
        // Randomness Variables
        keyhash = _keyhash;
        fee = 0.1 * 10**18;

        // Nft Variables
        _coolDownTime = 1 days;
        _nftId = 0;
        _nftPrice = nftPrice;
        _wearMultiplicator = wearMultiplicator;
        _attackPriceMultiplicator = attackMultiplicator;
        _rewardPriceMultiplicator = rewardPriceMultiplicator;

        // Token Contract Initialization
        _tokenUJG = TokenUJG(_tokenAddress);

    }

    /**
    *   @dev Just the owner of the nft: `StudentIndex.id` can interact with the function    
    */
    modifier OnlyOwnerOf(uint256 studentIndex) {
        require(msg.sender == _nftToOwner[_students[studentIndex].id],"U aren't the nft Owner");
        _;
    }

    /**
    *   @dev Checking the enough UJG Token balance of the account     
    */
    modifier EnoughToken(address account, uint256 amount){
        require(_tokenUJG.GetTokenBalance(account) >= amount,"Not enough UJG");
        _;
    }

    /**
    *   @dev Check the attacktime status 
    */
    modifier AttackReady(uint256 studentIndex){
        require(_students[studentIndex].attackTime <= now, "Let rest your Student");
        _;
    }

    /**
    *   @dev Check the market student status 
    */
    modifier InMarket(uint256 studentIndex){
        require(!(_students[studentIndex].market), "The Student are in market");
        _;
    }

    /** 
    *   @dev Transfer function for token payments within the game  `USER TO CONTRACT`
    */
    function _transferUserToContract(uint256 amount, address from) internal{
        _tokenUJG.TransferToken(from,address(this), amount);
        _tokenPool += amount;
    }

    /** 
    *   @dev Transfer function for token payments within the game  `CONTRACT TO USER`
    */
    function _transferContractToUser(uint256 amount, address to) internal{
        _tokenUJG.TransferToken(address(this),to, amount);
        _tokenPool -= amount;
    }

    /** 
    *   @dev Set the new `RewardMultiplicator`
    *
    *   Requirement:
    *   
    * - Only the contract owner can set a `RewardMultiplicator`
    */
    function SetRewardMultiplicator(uint256 newRewardMultiplicator) 
    public 
    OnlyOwner(msg.sender){
        _rewardPriceMultiplicator = newRewardMultiplicator;
    }

    /** 
    *   @dev Get the `_rewardPriceMultiplicator`
    */
    function GetRewardMultiplicator() 
    public 
    view
    returns(uint256)
    {return(_rewardPriceMultiplicator);}

    /**
    *   @dev Set the new `WearMultiplicator`
    *
    *   Requirement:
    *   
    * - Only the contract owner can set a `WearMultiplicator`
    */
    function SetWearMultiplicator(uint256 newWearMultiplicator) 
    public 
    OnlyOwner(msg.sender){
        _wearMultiplicator = newWearMultiplicator;
    }

    /** 
    *   @dev Get the `_wearMultiplicator`
    */
    function GetWearMultiplicator()
    public 
    view
    returns(uint256)
    {return(_wearMultiplicator);}

    /**
    *   @dev Set the new `AttackMultiplicator`
    *
    *   Requirement:
    *   
    * - Only the contract owner can set a `AttackMultiplicator`
    */
    function SetAttackPriceMultiplicator(uint256 newAttackMultiplicator) 
    public 
    OnlyOwner(msg.sender){
        _attackPriceMultiplicator = newAttackMultiplicator;
    }

    /** 
    *   @dev Get the `_attackPriceMultiplicator`
    */
    function GetAttackPriceMultiplicator() 
    public 
    view
    returns(uint256)
    {return (_attackPriceMultiplicator);}

    /**
    *   @dev Set the new `NftPrice`
    *
    *   Requirement:
    *   
    * - Only the contract owner can set a `NftPrice`
    */
    function SetNftPrice(uint256 newNftPrice) 
    public 
    OnlyOwner(msg.sender){
        _nftPrice = newNftPrice;
    }

    /**
    *   @dev Get the value nft price mint function
    */
    function GetNftPrice()
    public
    view 
    returns(uint256){return(_nftPrice);}

    /**
    *   @dev Get the Total attack price
    */
    function GetTotalAttackPrice(uint256 level)
    public
    view
    returns(uint256){return(10 * level * _attackPriceMultiplicator * 1 ether);}

    /** 
    *   @dev Get the power level
    */
    function GetPowerLevel(uint256 level)
    public
    view
    returns(uint256){return(level * 40);}
    
    /** 
    *   @dev Get the level reward
    */
    function Reward(uint256 level) 
    public 
    view
    returns(uint256){return(20 * level * _rewardPriceMultiplicator * 1 ether);}
    
    /**
    *   @dev Change the CoolDownTime value
    *   
    *   Requirements:
    *
    * - Only the owner can set a new `_coolDownTime` 
    */
    function SetCoolDownTime(uint32 coolDownTime) 
    public 
    OnlyOwner(msg.sender){
        _coolDownTime = coolDownTime;
    }

    /**
    *   @dev Get `_coolDownTime`
    */
    function GetCoolDownTime()
    public
    view
    returns(uint256){return(_coolDownTime);}

    /**
    *   @dev Restart the character Cooldown attack
    */
    function _triggerCooldown(uint256 _StudentIndex) 
    internal {
        _students[_StudentIndex].attackTime = uint32(now + _coolDownTime);
    }

    /**
    * @dev function to see if the nft win the attack 
    */
    function SeeWin(uint256 id)
    public
    view
    returns(bool){return(_winState[id]);}

    /**
    *   @dev Get request {VRFConsumerBase - requestRandomness}
    *   Kovan LinktToken Faucet: https://faucets.chain.link
    *
    *   Requirements:
    *
    * - Min user Link token balance 0.1
    *
    *   CAMMELCASE EXCEPTION FUNCTION
    */
    function requestRandomness(uint256 randomNumber) 
    internal 
    returns (bytes32) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill the contract with faucet");       

        bytes32 requestId = requestRandomness(keyhash, fee);

        _requestToSender[requestId] = msg.sender;

        // TEST LOCAL BLOCKCHAIN //
        _userRandomNumber[msg.sender] = randomNumber;

        return requestId;
    }

    /**
    *   @dev Save the random number `userRandomNumber`
    *   internal override {VRFConsumerBase - fulfillRandomness}
    *   CAMMELCASE EXCEPTION FUNCTION
    */
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) 
    internal 
    override {
        _userRandomNumber[_requestToSender[requestId]] = randomNumber;
    }

    /**
    *   @dev function that wear the nft 
    */
    function _wear(uint256 studentIndex, uint256 wearIntelligence) 
    internal{
        wearIntelligence = wearIntelligence * _wearMultiplicator;
        if (((_students[studentIndex].intelligenceLevel) - wearIntelligence) < 0){
            _students[studentIndex].intelligenceLevel = 0;
        }else{
            _students[studentIndex].intelligenceLevel -= wearIntelligence;
        }
    }

    /**
    *   @dev Mint a nft and associate with the owner
    *   get the `newId` from the number of total nft, take the random number and generate the stats
    *   and save it
    *
    *   Requirements:
    *   
    * - You can only create a student nft if you have the full price token in ur wallet
    */
    function CreateNftStudent(uint256 random) 
    public 
    EnoughToken(msg.sender,_nftPrice){

        _transferUserToContract(_nftPrice, msg.sender);

        uint256 newId = _nftId; // New Nft Id

        Student memory student =  _generatingStats(newId,random);
        /**
        *   @dev Increase the `_nftOwnerCount` because we got a new nft
        *   associated the mapping with `newId`: NftId with the owner
        *   _safeMint function call
        *
        *   Requirements:
        * - github {ERC720 - _safeMint}
        */
        _nftOwnerCount[msg.sender]++;

        _nftToOwner[newId] = msg.sender;

        _safeMint(msg.sender, newId);

        _nftsInGame++;
        emit NftCreated(student.name,student.level,student.intelligenceLevel,student.cheatLevel);
    }

    /**
    *   @dev Function that get the nft and attack the level
    * 
    *   Requirements:
    * 
    * - The `levelNumber` cannot be a value below than 1 an upper than 10
    * - The stat of `_intelligenceLevel` from `Student` need to be greater than 0
    * - You need to be the student owner
    * - Enough token to attack
    * - Your NFT need to be rest
    * - Your NFT It should not be in the marketplace
    */
    function Attack(uint256 studentIndex, uint256 levelNumber, uint256 random) 
    external 
    OnlyOwnerOf(studentIndex) 
    EnoughToken(msg.sender, GetTotalAttackPrice(levelNumber))
    AttackReady(studentIndex)
    InMarket(studentIndex)
    {
        require((levelNumber >= 1 && levelNumber <= 10), "Invalid Level");

        require(_students[studentIndex].intelligenceLevel > 0);

        requestRandomness(random);

        /**
        *   @dev `basePowerLevel` MIN value 40 and MAX value 400
        *   your stats and your random roll going to be evaluated
        *   if win ur wear it`s gonna be minus than if u losse, you request a random number,
        *   after that, thath go to trigger the cooldown function   
        */

        uint256 roll = (_userRandomNumber[msg.sender] % 100) + 1 ; 

        _triggerCooldown(studentIndex);

        uint256 attackPrice = GetTotalAttackPrice(levelNumber);

        _transferUserToContract(attackPrice, msg.sender);

        if( GetPowerLevel(levelNumber) <= (roll + _students[studentIndex].cheatLevel + _students[studentIndex].intelligenceLevel)){
            uint256 wear = (GetPowerLevel(levelNumber)/20)*2;
            _wear(studentIndex,wear);
            uint256 reward = Reward(levelNumber);
            _transferContractToUser(reward, msg.sender);
            _winState[studentIndex] = true;
            emit ResultAttack(true, roll + _students[studentIndex].cheatLevel + _students[studentIndex].intelligenceLevel, GetPowerLevel(levelNumber),wear,roll,reward);
    
        }else{
            uint256 wear = (GetPowerLevel(levelNumber)/10)*2;
            _wear(studentIndex,wear);
            _winState[studentIndex] = false;
            emit ResultAttack(false, roll + _students[studentIndex].cheatLevel + _students[studentIndex].intelligenceLevel, GetPowerLevel(levelNumber),wear,roll,-attackPrice);
        }

    }

    /**
    *   @dev generating the random stats for the nft and save it in the contract  
    */
    function _generatingStats(uint256 newId, uint256 random)
    internal
    returns(Student memory){
        requestRandomness(random);

        uint256 randomNumber = _userRandomNumber[msg.sender];

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
        
        //uint256 cheatLevel = ((randomNumber / 2) % 100) + 1;
        uint256 cheatLevel = ((randomNumber * 2) % 100) + 1;
        string memory name = _names[randomNumber % 25];

        Student memory character =  Student(level,intelligenceLevel,cheatLevel,name,uint32 (now),newId,false,0);
        // Saving the character...
        _students.push(character);
        _nftId+=1;
        return(character);
    }

}