// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./StudentsNft.sol";

/**
*   @title `Ujap students` game full solidity help functions
*   @dev Full StudentHelper implementation  
*/
contract StudentsMain is StudentsNft{

    struct StudentMarket{
        uint256 id;
        uint256 price;
        address owner;
    }

    StudentMarket[] internal market;

    /**
    *   @dev This constructor start the values of StundentsNft and the dependencies
    *   
    *   Warnings: Default Kovan networks, see the default values in docs on into Studentsnft.sol
    */
    constructor (
        address _VRFCoordinator, 
        address _linkToken, 
        bytes32 _keyhash, 
        address _tokenAddress,
        uint256 _nftPrice,
        uint256 _wearMultiplicator,
        uint256 _attackMultiplicator,
        uint256 _rewardPriceMultiplicator) public
    StudentsNft(_VRFCoordinator, _linkToken,_keyhash,_tokenAddress,_nftPrice,
    _wearMultiplicator,_attackMultiplicator,_rewardPriceMultiplicator){
    }

    /**
    *  @dev Burn the character, transfer to 0x0...address
    *  {ERC721 - _beforeTokenTransfer}
    *
    *   Warning:
    * - THIS WILL DELETE THE NFT
    */
    function burnNft(uint256 studentIndex) 
    external 
    onlyOwnerOf(studentIndex)
    inMarket(studentIndex){
        address owner = msg.sender;

        uint256 studentId = _students[studentIndex].id;

        _beforeTokenTransfer(owner, address(0), studentId);

        _nftOwnerCount[owner] -= 1;
        delete _nftToOwner[studentId];
        delete _students[studentIndex];

        _tokenUJG.TransferToken(address(this), msg.sender, 50);
    }


    /**
    *   @dev Transfer the character...
    *   {ERC721 - _transfer()} 
    */
    function transferNft(address from, address to, uint256 _StudentId) public 
    onlyOwnerOf(_StudentId)
    inMarket(getStudentIndexById(_StudentId))
    {
        _transfer(from,to,_StudentId);

        _nftOwnerCount[from] -=1;

        _nftOwnerCount[to] +=1;

        _nftToOwner[_StudentId] = to;
    }


    /** 
    *   @dev set the token address of the contract
    *
    *   Requirements:
    *   
    *   - Just the owner of the contract can doit
    */
    function setTokenERC20Address(address _address) external onlyOwner(){
        _tokenUJG = TokenUJG(_address);
    }

    /**
    *   @dev see all NFW OWNER ID
    *
    *   Requirements:
    * - the owner address cannot be 0x0...
    */
    function getStudentsByOwner(address _owner) external view returns(uint256[] memory){
        require(_owner != address(0),"Address 0x0... invalid");

        uint256[] memory result = new uint256[](_nftOwnerCount[_owner]);

        uint256 counter = 0;

        for (uint i = 0; i < _students.length; i++){

            if(_nftToOwner[i] == _owner){
                result[counter] = i;
                counter++;
            }

        }
        return result;
    }

    /** 
    *   @dev get the `_students` Stats no URI
    *
    */
    function getStudentStats(uint256 _StudentIndex) 
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
            _students[_StudentIndex].level,
            _students[_StudentIndex].intelligenceLevel,
            _students[_StudentIndex].cheatLevel,
            _students[_StudentIndex].name,
            _students[_StudentIndex].attackTime
        );
    }


    function putInMarket(uint256 _StudentIndex, uint256 _price) public onlyOwnerOf(_StudentIndex){
        market.push(
            StudentMarket(
                _StudentIndex,
                _price,
                msg.sender
            )
        );
        _students[_StudentIndex].market = true;
    }

    function buyMarket(uint256 amount, uint256 _marketIndex) public EnoughToken(msg.sender,amount){
        
        address owner = market[_marketIndex].owner;
        
        uint256 id = market[_marketIndex].id;

        address buyer = msg.sender;
        
        _tokenUJG.TransferToken(buyer, owner, amount);

        _students[id].market = false;

        transferNft(owner,buyer,_students[id].id);

        delete market[_marketIndex];

    }

    function getOutMarket(uint256 _marketIndex) public onlyOwnerOf(market[_marketIndex].id){
        address owner = market[_marketIndex].owner;
        
        uint256 amount = 1;
        _tokenUJG.TransferToken(owner, address(this), amount);
        
        uint256 id = market[_marketIndex].id;

        _students[id].market = false;

        delete market[_marketIndex];
    }

    
    /** 
    *   @dev get the URI from the NFT Tokem
    *
    *   Requirements: 
    *   
    *   - Only the owner of the token can doit
    */
    function getTokenURI(uint256 _StudentId) 
    public view onlyOwner() 
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
    public 
    onlyOwner(){
        _setTokenURI(_StudentId, _tokenURI);
    }

    function getNumbersNft(address account) 
    public 
    view 
    returns(uint256){return(_nftOwnerCount[account]);}

    function getTotalNftInGame() 
    public 
    view 
    returns(uint256){return(_students.length);}

    function getTotalNftInMarket() 
    public 
    view 
    returns(uint256){return(market.length);}

    function getStudentIndexById(uint256 id)
    public 
    view 
    returns(uint256){
        for (uint256 i = 0; i < _students.length; i++) {
            if(id == _students[i].id){
                return(i);
            }
        }
    }
}