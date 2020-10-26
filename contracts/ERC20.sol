// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.8.0;

contract ERC20{
    using SafeMath for uint256;
    string  public name = "Bidding Token";
    string  public symbol = "BID";
    uint256 public decimals=0;
    uint256 public totalSupply;
    address public ownerAddress;
    mapping(address => uint256)  balances;
    mapping (address => mapping (address => uint256)) public allowance;
    
    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
        
    modifier onlyOwner () {
      require(msg.sender == ownerAddress);
      _;
    }
    
    constructor (uint256 _initialSupply) public {
            ownerAddress=msg.sender;
            balances[msg.sender] = _initialSupply;
            totalSupply=_initialSupply;
    }
    
    function transfer(address _to, uint256 _value) public payable returns (bool success) {
            require(_value>0);
            require(balances[msg.sender]>=_value);
            
            balances[msg.sender] = balances[msg.sender].sub(_value);     
            balances[_to] =balances[_to].add(_value);
            emit Transfer(msg.sender, _to, _value);
            return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
            allowance[msg.sender][_spender] += _value;                                
            emit Approval(msg.sender,_spender, _value);
            return true;
    }
        
    function balanceOf(address request) public view returns (uint256){
            return balances[request];
    }
        
    function transferFrom(address _from, address _to, uint256 _value) public payable returns (bool success) {
          require (_value>0);
         require(_value <= allowance[_from][msg.sender]);  //checking that whether sender is approved or not...
         balances[_from]= balances[_from].sub(_value);
         balances[_to] = balances[_to].add(_value);
         allowance[_from][msg.sender]=allowance[_from][msg.sender].sub(_value);
           emit Transfer(_from, _to, _value);
                return true;
    }
    
    function changeowner(address _newaddress) public  returns(bool success){
        require(msg.sender==ownerAddress);
        balances[_newaddress]=balances[ownerAddress];
        balances[ownerAddress]=0;
        ownerAddress=_newaddress;
        return true;
    }
    
    function IncreaseSupply(uint256 _newSupply) public payable onlyOwner {
        balances[ownerAddress]=balances[ownerAddress].add(_newSupply);  
        totalSupply+=_newSupply;
    }
    
    function DecreaseSupply(uint _reduceSupply) public payable onlyOwner{
        require(_reduceSupply<=balances[ownerAddress]);
     balances[ownerAddress]=balances[ownerAddress].sub(_reduceSupply);
     totalSupply-=_reduceSupply;
    }

     
}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


