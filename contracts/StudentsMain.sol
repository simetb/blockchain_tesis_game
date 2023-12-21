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
    event TokenOperation(address from,address to, uint256 amount, uint256 etherPrice);

    event MarketTokenOwnerContract(uint256 bef, uint256 aft, string operation);

    event NftOperation(address from, address to, uint256 nftId, uint256 amount);

    event ContractBalance(uint256 balance);
    /** 
    *   @dev Control variables to control the price game token
    */
    // Amount of money(ether) in the contract
    uint256 private _liquidityPool;

    /**
    * @dev variable that save the marketWallet 
    */
    address private _marketWallet;

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

        // MarketWallet
        _marketWallet = msg.sender;
    }

    /** 
    *   Check if the actual nft exist in market
    */
    modifier MarketExist(uint256 studentIndex){
        require(_students[studentIndex].market,"The nft can be found or not exist, try latter...");
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
        _nftsInGame--;
        emit NftOperation(msg.sender, address(0), studentId, _burnReward);
    }

    function GetBurnReward() public view returns(uint256){
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
    function TransferNft(address from, address to, uint256 studentIndex) public 
    OnlyOwnerOf(studentIndex)
    InMarket(studentIndex)
    {
        uint256 studentId =  _students[studentIndex].id;
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
    view 
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
    *   @dev Get the `_students` (NFT) Info 
    *
    */
    function GetStudentInfo(uint256 studentIndex) 
    public 
    view 
    returns(
        uint256,
        uint256,
        uint256,
        string memory,
        uint32,
        uint256,
        bool
        ){
        return(
            _students[studentIndex].level,
            _students[studentIndex].intelligenceLevel,
            _students[studentIndex].cheatLevel,
            _students[studentIndex].name,
            _students[studentIndex].attackTime,
            _students[studentIndex].id,
            _students[studentIndex].market
        );
    }

    function GetStudentPrice(uint256 studentIndex)
    public
    view
    returns(uint256){return(_students[studentIndex].price);}


    /** 
    *   @dev Get the URI from the NFT Tokem
    */
    function GetTokenURI(uint256 studentId) 
    public 
    view 
    returns(string memory)
    {return tokenURI(studentId);}

    /** 
    *   @dev Get the URI from the NFT Tokem
    *
    *   Requirements: 
    *   
    */
    function SetTokenURI(uint256 studentId, string memory tokenURI) 
    public 
   {_setTokenURI(studentId, tokenURI);}

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
    returns(uint256){return(_nftsInGame);}

    /** 
    *   @dev Get the total Number of Nft in market
    */
    function GetTotalNftInMarket() 
    public 
    view 
    returns(uint256){return(_nftOwnerCount[_marketWallet]);}


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
    *   @dev see all the INDEX NFT of the market 
    *
    *   Requirements:
    * - the owner address cannot be 0x0...
    */
    function GetStudentsInMarket() 
    public 
    view 
    returns(uint256[] memory){
        uint256[] memory result = new uint256[](_nftOwnerCount[_marketWallet]);

        uint256 counter = 0;

        for (uint i = 0; i < _students.length; i++){

            if(_students[i].market){
                result[counter] = i;
                counter++;
            }

        }
        return result;
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
    EnoughToken(msg.sender, 10 * 1 ether){
        _transferUserToContract(10 * 1 ether, msg.sender);
        
        _students[studentIndex].market = true;

        _students[studentIndex].price = price;

        _transfer(msg.sender, _marketWallet, _students[studentIndex].id);

        _nftOwnerCount[_marketWallet] +=1;
        
        emit NftOperation(msg.sender, _marketWallet, _students[studentIndex].id, 10 * 1 ether);
    }

    /** 
    *   @dev Buy the nft from the market and transfer it to buyer wallet, change the nft market state
    *   and delete it from the market array
    *
    *   Requirements:
    *
    * - U need to have the enough amount of token in your wallet
    */
    function BuyMarket(uint256 studentIndex) 
    public 
    EnoughToken(msg.sender,_students[studentIndex].price)
    MarketExist(studentIndex){
        uint256 amount = _students[studentIndex].price;

        address owner = _nftToOwner[_students[studentIndex].id];
    
        address buyer = msg.sender;
        
        _tokenUJG.TransferToken(buyer, owner, amount);

        _students[studentIndex].market = false;

        _students[studentIndex].price = 0;

        _transfer(_marketWallet, buyer, _students[studentIndex].id);

        _nftOwnerCount[_marketWallet]-=1;
        
        _nftOwnerCount[owner] -=1;
        
        _nftOwnerCount[buyer] +=1;

        _nftToOwner[_students[studentIndex].id] = buyer;

        emit NftOperation(buyer, owner, _students[studentIndex].id, amount);
    }

    /** 
    *   @dev This function will remove the NFT from the marketplace and update the market state
    *
    *   Requirements:
    *
    * - U need to have the enough amount of token in your wallet
    */
    function GetOutMarket(uint256 studentIndex) 
    public 
    OnlyOwnerOf(studentIndex)
    EnoughToken(msg.sender, 10 * 1 ether)
    MarketExist(studentIndex){
        
        address owner = _nftToOwner[_students[studentIndex].id];

        _transferUserToContract(10 * 1 ether, owner);
        
        _transfer(_marketWallet, owner, _students[studentIndex].id);

        _students[studentIndex].market = false;

        _nftOwnerCount[_marketWallet] -=1;

        emit NftOperation(msg.sender, msg.sender, _students[studentIndex].id, 10 * 1 ether);
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
    function BuyToken(uint256 amount, uint256 price) external payable{
        require(msg.value >= ((amount * price)/1 ether));
        
        _tokenUJG.TransferToken(address(this), msg.sender, amount);
       
        _liquidityPool += msg.value;
        
        _tokenPool -= amount;
        
        emit TokenOperation(msg.sender,address(this), amount, (amount * price)/ 1 ether);
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
    function SellToken(uint256 amount,uint256 price) external payable EnoughToken(msg.sender, amount){
        uint256 total = ((price * amount)/1 ether);
        
        _transferUserToContract(amount, msg.sender);
        
        msg.sender.transfer(total);
        
        _liquidityPool -= total;

        _tokenPool +=amount;
        
        emit TokenOperation(address(this),msg.sender, amount,  (amount * price)/ 1 ether);
    }

    /**
    *   @dev Transfer the tokens from one account to another, this will reduce 
    *   the account of the sender and increase the account of the receiver
    *
    * - Requirements:
    *
    *   You need to have the full amount of token y your wallet
    */
    function TransferToken(address to,uint256 amount) public EnoughToken(msg.sender, amount){
        _tokenUJG.TransferToken(msg.sender,to,amount);
        emit TokenOperation(msg.sender,to,amount,0);
    }

    /** 
    *   @dev Get the value of the actual liquidity pool
    */
    function GetLiquidityPool() 
    public 
    view
    returns(uint256){return(_liquidityPool);}

    /** 
    *   @dev Get the value of the actual token pool
    */
    function GetTokenPool() 
    public
    view 
    returns(uint256){return(_tokenPool);}

    /** 
    *   @dev Increasse the liquidity of ther contract
    */
    function TransferLiquidity() public payable OnlyOwner(msg.sender){
        require(msg.value > 0);
        
        uint256 bef = _liquidityPool;
        
        _liquidityPool += msg.value;
        
        emit MarketTokenOwnerContract(bef,_liquidityPool,"+");
    }

    /** 
    *   @dev Decreasse the liquidity of ther contract
    */
    function Withdraw(uint256 amount, address payable owner) public payable OnlyOwner(msg.sender){
        
        owner.transfer(amount);
        
        uint256 bef = _liquidityPool;
        
        _liquidityPool -= amount;
        
        emit MarketTokenOwnerContract(bef,_liquidityPool,"-");
    }

    /** 
    *   @dev Get the contrac balance in eth
    */
    function GetContractBalance() 
    public {emit ContractBalance(address(this).balance);}

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

    /** 
    *   @dev Check the user balance
    */
    function TokenBalance(address account)
    public
    view
    returns(uint256){return(_tokenUJG.GetTokenBalance(account));}


    /** 
    *   @dev get the owner of the nft
    */
    function NftToOwner(uint256 nftId) public view returns(address){
        address owner = _nftToOwner[nftId];
        return(owner);
    }
}