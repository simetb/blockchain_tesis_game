// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Ownable.sol";

/**
*   @title TokenUJG to use it in the `Ujap students` game 
*   @dev Full implementation of an ERC20 and Ownable contracts
*   
*   Description:
*
*   Project made for the presentation of a university thesis, based on the studies 
*   and databases of the blockchain to create a game, made to be run on Kovan Test 
*   Blockchain, Local Blockchain and Main Ethereum Blockchain.
*
*   This contract (TokenUJG) contains the principal Struct of an token ERC20
*   
*   Author: https://github.com/simetb
*   
*   
*/

contract TokenUJG is ERC20,Ownable{

    constructor() 
    public 
    ERC20("UjapGame","UJG")
    Ownable(){}

    /** 
    *   @dev Trasnfer token from address to an address
    *
    *   Requirements:
    *
    *   - You need to have the full amount in your from wallet
    */
    function TransferToken(address from ,address to, uint256 amount ) external{
        _transfer(from, to, amount);
    }

    /** 
    *   @dev Mints more tokens in the "blocked" `owner` account
    *   (ERC20 - _mint(uint256 amount, address account))
    *
    */
    function MintToken(uint256 amount,address account,address caller) public OnlyOwner(caller){
        _mint(account, amount);
    }

    /**
    *   @dev See balance of tokens of an address
    */
    function GetTokenBalance(address account) public view returns(uint256){
        return(balanceOf(account));
    }

    /**
    *   @dev Burn the tokens...
    */
    function BurnToken(address from, uint256 amount, address caller) public OnlyOwner(caller){
        _burn(from,amount);
    }
}
