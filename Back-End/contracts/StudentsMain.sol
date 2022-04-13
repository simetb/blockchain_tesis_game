// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./StudentsNft.sol";

/**
*   @title `Ujap students` game full solidity help functions
*   @dev Full StudentHelper implementation  
*/
contract StudentsMain is StudentsNft{

    /**
    *   @dev This constructor start the values of StundentsNft and the dependencies
    *   
    *   Warnings: Default Kovan networks, see the default values in docs on into Studentsnft.sol
    */
    constructor (
        address _VRFCoordinator, 
        address _linkToken, 
        bytes32 _keyhash, 
        address _tokenAddress) public
    StudentsNft(_VRFCoordinator, _linkToken,_keyhash,_tokenAddress){
    }

    /**
    *  @dev Burn the character, transfer to 0x0...address
    *  {ERC721 - _beforeTokenTransfer}
    *
    *   Warning:
    * - THIS WILL DELETE THE NFT
    */
    function burn(uint256 _StudentId) external onlyOwnerOf(_StudentId){
        address owner = msg.sender;

        ERC721._beforeTokenTransfer(owner, address(0), _StudentId);

        nftOwnerCount[owner] -= 1;
        delete nftToOwner[_StudentId];

        tokenUJG.TransferToken(owner, msg.sender, 50);
    }


    /**
    *   @dev Transfer the character...
    *   {ERC721 - _transfer()} 
    */
    function transfer(address from, address to, uint256 _StudentId) external onlyOwnerOf(_StudentId){
        ERC721._transfer(from,to,_StudentId);
        nftOwnerCount[from] --;
        nftOwnerCount[to] ++;
        nftToOwner[_StudentId] = to;
    }


    /** 
    *   @dev set the token address of the contract
    *
    *   Requirements:
    *   
    *   - Just the owner of the contract can doit
    */
    function setTokenERC20Address(address _address) external onlyOwner(){
        tokenUJG = TokenUJG(_address);
    }

    /**
    *   @dev see all NFW OWNER ID
    *
    *   Requirements:
    * - the owner address cannot be 0x0...
    */
    function getStudentsByOwner(address _owner) external view returns(uint256[] memory){
        require(_owner != address(0),"Address 0x0... invalid");

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
    *   @dev get the students Stats no URI
    *
    */
    function getStudentStats(uint _StudentId) 
    public 
    view 
    returns(
        uint256,
        uint256,
        uint256,
        string memory,
        uint32
        ){
        return(
            students[_StudentId].level,
            students[_StudentId].intelligenceLevel,
            students[_StudentId].cheatLevel,
            students[_StudentId].name,
            students[_StudentId].attackTime
        );
    }
}