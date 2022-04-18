// contracts/StudentsNft.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./StudentsNft.sol";
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
*   This contract (StudentsMain) contains all the elements for the admin of the NFT and the Token
*   
*   Author: https://github.com/simetb
*   
*   
*/
contract StudentsMain is StudentsNft{

    /** 
    *   @dev Events of the contract to js
    */
    event MarketToken(address owner, uint256 amount, uint256 etherPrice);

    event MarketTokenOwnerContract(uint256 bef, uint256 aft, string operation);

    event NftOperation(address from, address to, uint256 nftId, uint256 amount);
    /** 
    *   @dev Control variables to control the price game token
    */
    // Amount of money(ether) in the contract
    uint256 private _liquidityPool;

    struct StudentMarket{
        uint256 id;
        uint256 price;
        address owner;
    }

    /**
    *   @dev Array NFT in marketplace save struct `StudentMarket`
    */    
    StudentMarket[] internal _market;

    // The reward token amount that you get for burn ur nft
    uint256 private _burnReward;
    // The price token amount that you use it in a transfer 
    uint256 private _transferPrice;

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
        uint256 _rewardPriceMultiplicator,
        uint256 tokenPool,
        uint256 burnReward,
        uint256 transferPrice
        ) public
    StudentsNft(_VRFCoordinator, _linkToken,_keyhash,_tokenAddress,_nftPrice,
    _wearMultiplicator,_attackMultiplicator,_rewardPriceMultiplicator)
    {

        // TokenPool Initialization   
        _tokenPool = tokenPool;
        _tokenUJG.MintToken(tokenPool, address(this),msg.sender);

        //  Price variables initialization
        _burnReward = burnReward;
        _transferPrice = transferPrice;
    }

    /** 
    *   Check if the actual nft exist in market
    */
    modifier MarketExist(uint256 id){
        bool exist = false;
        for (uint256 index = 0; index < _market.length; index++) {
            if(_market[index].id == id){
                exist = true;
            } 
        }
        require(exist,"The nft can be found or not exist, try latter...");
        _;
    }

    /** 
    *   @dev Set the token address of the contract
    *
    *   Requirements:
    *   
    * - Just the owner of the contract can doit
    */
    function SetTokenERC20Address(address newAddress) external OnlyOwner(msg.sender){
        _tokenUJG = TokenUJG(newAddress);
    }

    /**
    *  @dev Burn the character, transfer to 0x0...address
    *   and remove it from the arrays 
    *  {ERC721 - _beforeTokenTransfer}
    *
    *   Requirements:
    *
    * - You need to be the owner of the NFT
    * - The nft cannot be in the marketplace
    *
    *   Warning:
    * 
    * - THIS WILL DELETE THE NFT
    */
    function BurnNft(uint256 studentIndex) 
    external 
    OnlyOwnerOf(studentIndex)
    InMarket(studentIndex){
        address owner = msg.sender;

        uint256 studentId = _students[studentIndex].id;

        _beforeTokenTransfer(owner, address(0), studentId);

        _nftOwnerCount[owner] -= 1;
        delete _nftToOwner[studentId];
        delete _students[studentIndex];

        _transferContractToUser(_burnReward, msg.sender);
        emit NftOperation(msg.sender, address(0), studentId, _burnReward);
    }

    function GetBurnReward() public OnlyOwner(msg.sender) returns(uint256){
        return(_burnReward);
    }

    function SetBurnReward(uint256 newBurnReward) public OnlyOwner(msg.sender){
        _burnReward = newBurnReward;
    }

    /**
    *   @dev Transfer the character from a wallet to another wallet...
    *   {ERC721 - _transfer()} 
    *
    *   Requirements:
    *
    * - You need to be the owner of the NFT
    * - The nft cannot be in the marketplace
    */
    function TransferNft(address from, address to, uint256 studentId) public 
    OnlyOwnerOf(studentId)
    InMarket(GetStudentIndexById(studentId))
    {
        _transferUserToContract(_transferPrice, msg.sender);
        _transferLogic(from, to, studentId);
        emit NftOperation(from, to, studentId, _transferPrice);
    }
    
    /** 
    *   @dev Get the `_transferPrice` global variable
    *
    *   Requirements: 
    *
    * - only the owner cant  do it
    */
    function GetTransferPrice() 
    public 
    OnlyOwner(msg.sender) 
    returns(uint256){return(_transferPrice);}

    /** 
    *   @dev set a new `_transferPrice` variable price 
    *
    *   Requirements: 
    *
    * - only the owner cant  do it
    */
    function SetTransferPrice(uint256 newTransferPrice) 
    public 
    OnlyOwner(msg.sender){_transferPrice = newTransferPrice;}

    /** 
    *   @dev got all the logic of {ERC721 - _transfer()} to simplify the code
    */
    function _transferLogic(address from, address to, uint256 studentId) internal{
        _transfer(from,to,studentId);

        _nftOwnerCount[from] -=1;

        _nftOwnerCount[to] +=1;

        _nftToOwner[studentId] = to;
    }

    /**
    *   @dev see all the INDEX NFT of the owner 
    *
    *   Requirements:
    * - the owner address cannot be 0x0...
    */
    function GetStudentsByOwner(address owner) public view returns(uint256[] memory){
        require(owner != address(0),"Address 0x0... invalid");

        uint256[] memory result = new uint256[](_nftOwnerCount[owner]);

        uint256 counter = 0;

        for (uint i = 0; i < _students.length; i++){

            if(_nftToOwner[i] == owner){
                result[counter] = i;
                counter++;
            }

        }
        return result;
    }

    /** 
    *   @dev Get the `_students` (NFT) Stats 
    *
    */
    function GetStudentStats(uint256 studentIndex) 
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
            _students[studentIndex].level,
            _students[studentIndex].intelligenceLevel,
            _students[studentIndex].cheatLevel,
            _students[studentIndex].name,
            _students[studentIndex].attackTime
        );
    }

    /** 
    *   @dev Get the URI from the NFT Tokem
    *
    *   Requirements: 
    *   
    *   - Only the owner of the token can doit
    */
    function GetTokenURI(uint256 studentId) 
    public view OnlyOwner(msg.sender) 
    returns(string memory)
    {return tokenURI(studentId);}

    /** 
    *   @dev Get the URI from the NFT Tokem
    *
    *   Requirements: 
    *   
    *   - Only the owner of the token can doit
    */
    function SetTokenURI(uint256 studentId, string memory tokenURI) 
    public 
    OnlyOwner(msg.sender){_setTokenURI(studentId, tokenURI);}

    /** 
    *   @dev Get the total Number of Nft from an account
    */
    function GetNumbersNft(address account) 
    public 
    view 
    returns(uint256){return(_nftOwnerCount[account]);}

    /** 
    *   @dev Get the total Number of Nft in game
    */
    function GetTotalNftInGame() 
    public 
    view 
    returns(uint256){return(_students.length);}

    /** 
    *   @dev Get the total Number of Nft in market
    */
    function GetTotalNftInMarket() 
    public 
    view 
    returns(uint256){return(_market.length);}

    /** 
    *   @dev Get the student index by the id
    */
    function GetStudentIndexById(uint256 id)
    public 
    view 
    returns(uint256){
        for (uint256 i = 0; i < _students.length; i++) {
            if(id == _students[i].id){
                return(i);
            }
        }
    }

    /** 
    *   @dev Get the student market index by the id
    */
    function GetMarketIndexById(uint256 id)
    public
    view
    returns(uint256){
        for (uint256 i = 0; i < _market.length; i++) {
            if(id == _market[i].id){
                return(i);
            }
        }
    }

    /**
    *   @dev Put the student in a market this gonna change the market 
    *   state of the nft struct to true, cant be transferible , playable
    *
    *   Requirements:
    *
    * - U need to be the owner of the NFT
    */
    function PutInMarket(uint256 studentIndex, uint256 price) 
    public 
    OnlyOwnerOf(studentIndex)
    EnoughToken(msg.sender, 10){
        _transferUserToContract(10, msg.sender);
        
        _market.push(
            StudentMarket(
                _students[studentIndex].id,
                price,
                msg.sender
            )
        );
        _students[studentIndex].market = true;
        
        emit NftOperation(msg.sender, address(this), _students[studentIndex].id, 10);
    }

    /** 
    *   @dev Buy the nft from the market and transfer it to buyer wallet, change the nft market state
    *   and delete it from the market array
    *
    *   Requirements:
    *
    * - U need to have the enough amount of token in your wallet
    */
    function BuyMarket(uint256 amount, uint256 marketIndex) 
    public 
    EnoughToken(msg.sender,amount)
    MarketExist(_market[marketIndex].id){
        
        address owner = _market[marketIndex].owner;
    
        uint256 indexNft = GetStudentIndexById(_market[marketIndex].id);

        address buyer = msg.sender;
        
        _tokenUJG.TransferToken(buyer, owner, amount);

        _students[indexNft].market = false;

        _transferLogic(owner,buyer,_students[indexNft].id);

        delete _market[marketIndex];

        emit NftOperation(buyer, owner, _students[indexNft].id, amount);
    }

    /** 
    *   @dev This function will remove the NFT from the marketplace and update the market state
    *
    *   Requirements:
    *
    * - U need to have the enough amount of token in your wallet
    */
    function GetOutMarket(uint256 nftId) 
    public 
    OnlyOwnerOf(nftId)
    EnoughToken(msg.sender, 10)
    MarketExist(nftId){
        uint256 marketIndex = GetMarketIndexById(nftId);

        address owner = _market[marketIndex].owner;
        
        _transferUserToContract(10, owner);
        
        uint256 indexNft = GetStudentIndexById(_market[marketIndex].id); 

        _students[indexNft].market = false;

        delete _market[marketIndex];

        emit NftOperation(msg.sender, msg.sender, _market[marketIndex].id, 10);
    }

    /**
    *   @dev Buy the token for the game this increases the liquidity of the game
    *   and reduce the tokenPool, these token prices are worked on ether and emit
    *   an event with information
    *
    * - Requirements:
    *
    *   You need to have the full price in ether in the transfer
    */
    function BuyToken(uint256 amount) public payable{
        require(msg.value >= (amount * (GetTokenPrice())));
        
        _tokenUJG.TransferToken(address(this), msg.sender, amount);
       
        uint256 countEther = msg.value/(1 ether);
        
        _liquidityPool += countEther;
        
        _tokenPool -= amount;
        
        emit MarketToken(msg.sender, amount, amount * (GetTokenPrice()));
    }

    /**
    *   @dev Sell the token for the game this decrease the liquidity of the game
    *   and increase the tokenPool, token prices are worked on ether and emit an
    *     event with information
    *
    * - Requirements:
    *
    *   You need to have the full amount of token y your wallet
    */
    function SellToken(uint256 amount) public payable EnoughToken(msg.sender, amount){
        uint256 total = (GetTokenPrice() * amount);
        
        _transferUserToContract(amount, msg.sender);
        
        msg.sender.transfer(total * 1 ether);
        
        _liquidityPool -= total;
        
        emit MarketToken(msg.sender, amount, amount * (GetTokenPrice()));
    }

    /**
    *   @dev Get the actual token price 
    */
    function GetTokenPrice() 
    public 
    view 
    returns(uint256){return(_liquidityPool/_tokenPool);}

    /** 
    *   @dev Get the value of the actual liquidity pool
    */
    function GetLiquidityPool() 
    public 
    OnlyOwner(msg.sender) 
    returns(uint256){return(_liquidityPool);}

    /** 
    *   @dev Get the value of the actual token pool
    */
    function GetTokenPool() 
    public 
    OnlyOwner(msg.sender) 
    returns(uint256){return(_tokenPool);}

    /** 
    *   @dev Increasse the liquidity of ther contract
    */
    function TransferLiquidity() public payable OnlyOwner(msg.sender){
        require(msg.value > 0);
        
        uint256 countEther = msg.value/(1 ether);
        
        uint256 bef = _liquidityPool;
        
        _liquidityPool += countEther;
        
        emit MarketTokenOwnerContract(bef,_liquidityPool,"+");
    }

    /** 
    *   @dev Decreasse the liquidity of ther contract
    */
    function Withdraw(uint256 amount, address payable owner) public payable OnlyOwner(msg.sender){
        
        owner.transfer(amount * 1 ether);
        
        uint256 bef = _liquidityPool;
        
        _liquidityPool -= amount;
        
        emit MarketTokenOwnerContract(bef,_liquidityPool,"-");
    }

    /** 
    *   @dev Get the contrac balance in eth
    */
    function GetContractBalance() 
    public 
    OnlyOwner(msg.sender) 
    returns(uint256){return(address(this).balance * 1 ether);}

    /** 
    *   @dev Increasse the token pool, this will decreasse the price of token.
    */
    function MintTokens(uint256 amount) public{
        
        _tokenUJG.MintToken(amount,address(this),msg.sender);
        
        uint256 bef = _tokenPool;
        
        _tokenPool += amount;
        
        emit MarketTokenOwnerContract(bef,_tokenPool,"+");
    }

    /** 
    *   @dev Decreasse the token pool, this will increasse the price of token.
    */
    function BurnTokens(uint256 amount) public{
        _tokenUJG.BurnToken(address(this), amount, msg.sender);
        uint256 bef = _tokenPool;
        _tokenPool -= amount;
        emit MarketTokenOwnerContract(bef,_tokenPool,"-");
    }
}