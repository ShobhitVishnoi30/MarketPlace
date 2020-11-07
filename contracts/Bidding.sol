// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.8.0;

interface ERC20{
    
    function balanceOf(address request) external returns (uint256);
    function transferFrom(address _from, address _to, uint256 _value) external payable returns (bool success);
    
}

contract Bidding{
    
    ERC20 tokenAddress;
    
    struct highestBidding{
        address highestBidder;
        uint256 highestBid;
    }
    
    mapping(uint256 => mapping(address =>uint256[])) cropBidderBiddings;
    
    mapping(uint256 => highestBidding) currentBidWinner;
    
    address public ownerAddress;
    
    mapping(address => mapping(uint256 => uint256)) lockedAmount;
    
    mapping(uint256 => address[]) bidderList;
    
    uint256[] addedCrop;
    
    mapping(uint256 => address) cropOwner;
    
    uint256 uniqueID=0;
    
     
    modifier onlyOwner {
        require(msg.sender == ownerAddress);
        _;
    }
    
    
    constructor()public{
        ownerAddress=msg.sender;
    }
    
    function setTokenContracAddress(address contractAddress) public payable onlyOwner{
        tokenAddress = ERC20(contractAddress);
    }

    
    
    function addCropForAuction(address _ownerAddress) public onlyOwner returns(bool){
        uniqueID++;
        addedCrop.push(uniqueID);
        cropOwner[uniqueID]=_ownerAddress;
    }
    
    function lockAmount( uint256 _cropID ,  uint256 _amount )public payable returns(bool){
        require(_amount>10,"_amount can not be less than 10");
        require(tokenAddress.balanceOf(msg.sender)>=_amount,"Not enough balance to lock");
        require(lockedAmount[msg.sender][_cropID]==0,"Already locked");
        bool issuccess=tokenAddress.transferFrom(msg.sender,ownerAddress,_amount);
        require(issuccess,"unable to lock");
        lockedAmount[msg.sender][_cropID] = _amount;  
        bidderList[_cropID].push(msg.sender);
        return true;
        
    }
    
    
    function enterBid(uint256 _cropID,uint256 _bidAmount) public returns(bool){
        require(lockedAmount[msg.sender][_cropID]!=0,"You have not locked Amount");
         cropBidderBiddings[_cropID][msg.sender].push(_bidAmount);
         currentBidWinner[_cropID].highestBidder=msg.sender;
         currentBidWinner[_cropID].highestBid=_bidAmount;
    }
    
    function findCurrentHighestBidder(uint256 _cropID) public view returns(address,uint256){
        return(currentBidWinner[_cropID].highestBidder,currentBidWinner[_cropID].highestBid);
    }
    
    function endAuction(uint256 _cropID) public payable returns(address,uint256){
        for(uint256 i=0;i<bidderList[_cropID].length;i++){
            if(bidderList[_cropID][i]!=currentBidWinner[_cropID].highestBidder){
                tokenAddress.transferFrom(ownerAddress,bidderList[_cropID][i],lockedAmount[bidderList[_cropID][i]][_cropID]);
            }
            else{
                tokenAddress.transferFrom(currentBidWinner[_cropID].highestBidder,cropOwner[_cropID],currentBidWinner[_cropID].highestBid-lockedAmount[bidderList[_cropID][i]][_cropID]);
            }
        }
        return(currentBidWinner[_cropID].highestBidder,currentBidWinner[_cropID].highestBid);
    }
    
    function getYourBidding(uint256 _cropID)public view returns(uint256[] memory){
        return cropBidderBiddings[_cropID][msg.sender];
    }
    function getBidderList(uint256 _cropID) public view returns(address[] memory){
        return bidderList[_cropID];
    }
}