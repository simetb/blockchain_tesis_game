// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

//Contracts Openzeppelin - Chainlink
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract StudentsNft is ERC721, VRFConsumerBase{
    
    // Nfts vars...
        // Random Nft Names
    string[] names = ["Temis", "Jekatherina", "Hernandez","Gabriel","Maria","Juan","Maru",
           "Sebastian", "Kevin", "Caranfa", "Julio", "Sammer", "Edkar",
           "Quintero", "Ochado", "Francisco", "Diego", "Cristian", "Luis",
           "Gocho", "Lopez" , "Marcel" , "Kristofer" , "Simet" , "Manguito"];
        // student skills
    struct Student{
        uint256 level; // 1 2 3
        uint256 intelligenceLevel; // 0-300
        uint256 cheatLevel; // 0-100 
        string name; // "Student Name RANDOM"
    }
        // All NFT Students
    Student[] public students;
        // Mapping from the owner to the amount of nft students
    mapping(address => uint256) public nftOwnerCount;
        // Mapping from the owner to the nft
    mapping(uint256 => address ) public nftToOwner;

    
    // constructor vars
    bytes32 keyhash; // keyhash vrfcoordinator...
    uint256 fee; // fee vrfcoordinator randomnumber...

    // user that request of the random
    mapping(bytes32 => address) public requestToSender;

    // constructor function of the contract
    constructor(address _VRFCoordinator, address _linkToken, bytes32 _keyhash, uint256 _fee) public 
    VRFConsumerBase(_VRFCoordinator, _linkToken) 
    ERC721("Ujapista","UJAP")
    {
        keyhash = _keyhash;
        fee = _fee;
    }

    // Random Number Request
    function requestRandomness() public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill the contract with faucet"
            ); // Require LINK TOKEN from chainLink
        bytes32 requestId = requestRandomness(keyhash, fee);
        requestToSender[requestId] = msg.sender; //Random Request 
        return requestId;
    }

    // Nft Random Creatrion
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        uint256 newId = students.length; // NFT ID

        // Stats
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
        students.push(
            Student(
                level,
                intelligenceLevel,
                cheatLevel,
                name
            )
        );

        // NFT mint associated to the owner address
        address caller = requestToSender[requestId];
        nftOwnerCount[caller]++;
        nftToOwner[newId] = caller;
        _safeMint(caller, newId);

    }

    function getStudentsByOwner(address _owner) external view returns(uint256[] memory){
        // Get all the ID students from the owner 
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

}