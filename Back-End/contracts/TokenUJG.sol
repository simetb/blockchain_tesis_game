// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Ownable.sol";

/**
*   @title tokenUJG to use it in the `Ujap students` game 
*/

contract TokenUJG is ERC20,Ownable{
    constructor() public 
    ERC20("UjapGame","UJG")
    Ownable(){
    }

    /**
    *   @dev Throws if called by any account other than the owner.
    */

    /** 
    *   @dev Trasnfer token from address to an address
    *
    *   Requirements:
    *
    *   - You need to have the full amount in your balance wallet
    */
    
    function TransferToken(address from, address to, uint256 amount ) public {
        _transfer(from, to, amount);
    }

    /** 
    *   @dev mints more tokens in the "blocked" `owner` account
    *   (ERC20 - _mint(uint256 amount, address account))
    *
    */
    function mintToken(uint256 amount,address account) public {
        _mint(account, amount);
    }

    /**
    *   @dev see balance
    */
    function getTokenBalance(address account) public view returns(uint256){
        return(balanceOf(account));
    }

    function burnToken(address from, uint256 amount) public{
        _burn(from,amount);
    }
}
