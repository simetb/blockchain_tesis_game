// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";


contract StudentsNft is ERC721, VRFConsumerBase{
    
    enum Names{TEST,TEST2,TEST3}
    uint256 public randomResult;
    uint256 tokenCounter;
    bytes32 keyhash;
    uint256 fee;

    // student skills
    struct Student{
        uint256 level; // 1 2 3
        uint256 intelligenceLevel; // 0-100
        uint256 cheatLevel; // 0-100 
        string name; // "Student Name RANDOM"
    }

    constructor(address _VRFCoordinator, address _linkToken, bytes32 _keyhash, uint256 _fee) public 
    VRFConsumerBase(_VRFCoordinator, _linkToken) 
    ERC721("Ujapista","UJAP")
    {
        tokenCounter = 0;
        keyhash = _keyhash;
        fee = _fee;
    }

    function requestRandomness() public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill the contract with faucet"
            );
        bytes32 requestId = requestRandomness(keyhash, fee);
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        randomResult = randomNumber;
    }

}