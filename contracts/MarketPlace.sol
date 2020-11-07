// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.8.0;

interface ERC20{
    
    function balanceOf(address request) external returns (uint256);
    function transferFrom(address _from, address _to, uint256 _value) external payable returns (bool success);
    
}


contract MarketPlace{
    
    mapping(address =>uint256[]) buyHistory;
    mapping(address => uint256[]) sellHistory;
    address public ownerAddress;
    
    ERC20 tokenAddress;
    
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

    function buyToken(uint256 _tokenAmount) public returns(bool){
        require(_tokenAmount>0,"Token amount can not be zero");
        bool issuccess=tokenAddress.transferFrom(ownerAddress,msg.sender,_tokenAmount);
        require(issuccess,"Not successful");
        buyHistory[msg.sender].push(_tokenAmount);
        return true;
    }
    
    function sellToken(uint256 _tokenAmount)public returns(bool){
        require(_tokenAmount>0,"Token amount can not be zero");
        bool issuccess=tokenAddress.transferFrom(msg.sender,ownerAddress,_tokenAmount);
        require(issuccess,"Not successful");
        sellHistory[msg.sender].push(_tokenAmount);
        return true;
    }

}