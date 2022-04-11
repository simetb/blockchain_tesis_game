// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


/**
*   @title `Ujap students` game full solidity nft contract
*   @dev Full implementation of an ERC721, VRFConsumerBase, Ownable, Strings contracts
*/

contract StudentsNft is ERC721, VRFConsumerBase{
    
    // Random Nft Names
    string[] names = ["Temis", "Jekatherina", "Hernandez","Gabriel","Maria","Juan","Maru",
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
    mapping(bytes32 => address) public requestToSender;

    //  Data random number from the user
    mapping(address => uint256) userRandomNumber;

    /**
    *   @dev kovan default blockhain implementation
    *   `_keyhash` kovan default = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
    *   `_fee` kovan default = 100000000000000000
    *   `_VRFCoordinator` = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
    *   `_linkToken` = 0xa36085F69e2889c224210F603D836748e7dC0088
    */
    bytes32 keyhash;

    uint256 fee;

    uint32 coolDownTime;
    
    constructor(address _VRFCoordinator, address _linkToken, bytes32 _keyhash, uint256 _fee, uint32 _coolDownTime) public 
    VRFConsumerBase(_VRFCoordinator, _linkToken) 
    ERC721("Ujapista","UJAP")
    {
        keyhash = _keyhash;
        fee = _fee;
        coolDownTime = _coolDownTime;
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
    function createNftStudent() public {
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
    *   @dev see all NFW OWNER ID
    *
    *   Requirements:
    * - the owner address cannot be 0x0...
    */
    function getStudentsByOwner(address _owner) external view returns(uint256[] memory){
        require(_owner != address(0),"Addess 0x0... invalid");

        uint256[] memory result = new uint256[](nftOwnerCount[_owner]);

        uint256 counter = 0;

        for (uint i = 0; i < students.length; i++){

            if(nftToOwner[i] == _owner){
                result[counter] = i;
                counter++;
            }

        }
        return result;
    }

    /**
    *   @dev Change the CoolDownTime value 
    */
    function setCoolDownTime(uint32 _coolDownTime) public {
        coolDownTime = _coolDownTime;
    }

}