// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./StudentsNft.sol";

/**
*   @title `Ujap students` game full solidity help functions
*   @dev Full StudentHelper implementation  
*/
contract StudentsHelper is StudentsNft{

    /**
    *   @dev This constructor start the values of StundentsNft and the dependencies
    *   
    *   Warnings: Default Kovan networks, see the default values in docs on into Studentsnft.sol
    */
    constructor (address _VRFCoordinator, address _linkToken, bytes32 _keyhash, uint256 _fee, uint32 _coolDownTime) public
    StudentsNft(_VRFCoordinator, _linkToken,_keyhash, _fee, _coolDownTime){
    }

    /**
    *   @dev just the owner of the nft: `_StudentId` can interact with the function    
    */
    modifier onlyOwnerOf(uint256 _StudentId) {
        require(msg.sender == nftToOwner[_StudentId],"U aren't the nft Owner");
        _;
    }

    /**
    *   @dev function that get the nft and attack the level
    * 
    *   Requirements:
    * 
    * - The `_levelNumber` cannot be a value below than 1 an upper than 10
    * - The stat of `_intelligenceLevel` from `Student` need to be greater than 0
    */
    function attack(uint256 _StudentId, uint256 _levelNumber) external onlyOwnerOf(_StudentId) returns(bool){
        require((_levelNumber >= 1 && _levelNumber <= 10), "Invalid Level");

        Student memory student = students[_StudentId];

        require(student.intelligenceLevel > 0);

        /**
        *   @dev `basePowerLevel` MIN value 40 and MAX value 400
        *   your stats and your random roll going to be evaluated
        *   if win ur wear it`s gonna be minus than if u losse, you request a random number,
        *   after that, thath go to trigger the cooldown function   
        */
        requestRandomness();

        uint256 basePowerLevel = 40 * (_levelNumber);

        uint256 roll = (userRandomNumber[msg.sender] % 100) + 1 ; 

        uint256 totalAttackPower = roll + student.cheatLevel + student.intelligenceLevel;

        _triggerCooldown(student);

        if( basePowerLevel <= totalAttackPower){
            uint256 wear = (basePowerLevel/20)*2;
            _wear(student,wear);
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
    *  @dev Burn the character, transfer to 0x0...address
    *  {ERC721 - _beforeTokenTransfer}
    *
    *   Warning:
    * - THIS WILL DELETE THE NFT
    */
    function burn(uint256 _StudentId) external onlyOwnerOf(_StudentId){
        address owner = msg.sender;

        _beforeTokenTransfer(owner, address(0), _StudentId);

        nftOwnerCount[owner] -= 1;
        delete nftToOwner[_StudentId];

        //REWARD//
    }


    /**
    *   @dev Transfer the character...
    *   {ERC721 - _transfer()} 
    */
    function transfer(address from, address to, uint256 _StudentId) external onlyOwnerOf(_StudentId){
        _transfer(from,to,_StudentId);
        nftOwnerCount[from] --;
        nftOwnerCount[to] ++;
        nftToOwner[_StudentId] = to;
    }

    /**
    * @dev function that wear the nft 
    */
    function _wear(Student memory _student, uint256 _wearIntelligence) internal{
        if ((_student.intelligenceLevel - _wearIntelligence) < 0){
            _student.intelligenceLevel = 0;
        }else{
            _student.intelligenceLevel -= _wearIntelligence;
        }
    }
}



// Cooldown CHECK
// Attack CHECK
// Burn CHECK
// Transfer CHECK
// Wear CHECK
// Reward
// MarketPlace