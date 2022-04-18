// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

/** 
*   @dev Contract developed to prevent the improper use of some 
*   functions in our contracts, providing protection to the owner
*
*   Description:
*
*   Project made for the presentation of a university thesis, based on the studies 
*   and databases of the blockchain to create a game, made to be run on Kovan Test 
*   Blockchain, Local Blockchain and Main Ethereum Blockchain.
*
*   Author: https://github.com/simetb
*/
contract Ownable{
    
    // Contract owner address
    address private _owner;
    
    // First Run `_owner` = msg.sender
    constructor() public{
        _owner = msg.sender;
    }

    /**
    *   @dev Modifier to protect the functions
    */
    modifier OnlyOwner(){
        require(GetOwner() == msg.sender,"OWNER: Caller aren`t the Contract Owner!");
        _;
    }

    /** 
    *   @dev get the owner of the contract
    */
    function GetOwner() public view returns(address){
        return(_owner);
    }

    /**
    *   @dev Transfer the owner powers
    *
    *   Requirements:
    *
    * - Just the first owner can call this function
    */
    function TransferOwner(address _newOwner) internal OnlyOwner(){
        _owner = _newOwner;
    }
}