var MyContract = artifacts.require("./ERC20.sol");
var MyContract = artifacts.require("./ERC20.sol");
var MyContract = artifacts.require("./ERC20.sol");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(MyContract,100000000);
  };