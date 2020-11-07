var TX = require("ethereumjs-tx").Transaction;
const Web3 = require('web3');
//web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/..........."));
var ERCAbi =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_reduceSupply",
				"type": "uint256"
			}
		],
		"name": "DecreaseSupply",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newSupply",
				"type": "uint256"
			}
		],
		"name": "IncreaseSupply",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "request",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newaddress",
				"type": "address"
			}
		],
		"name": "changeowner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
];

var marketAbi= [
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "ownerAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          }
        ],
        "name": "setTokenContracAddress",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenAmount",
            "type": "uint256"
          }
        ],
        "name": "buyToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenAmount",
            "type": "uint256"
          }
        ],
        "name": "sellToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
var biddingAbi= [
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "ownerAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          }
        ],
        "name": "setTokenContracAddress",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "_ownerAddress",
            "type": "address"
          }
        ],
        "name": "addCropForAuction",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cropID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "lockAmount",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cropID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_bidAmount",
            "type": "uint256"
          }
        ],
        "name": "enterBid",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cropID",
            "type": "uint256"
          }
        ],
        "name": "findCurrentHighestBidder",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cropID",
            "type": "uint256"
          }
        ],
        "name": "endAuction",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cropID",
            "type": "uint256"
          }
        ],
        "name": "getYourBidding",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cropID",
            "type": "uint256"
          }
        ],
        "name": "getBidderList",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];
var ERCContractAddress="0x9D68ABa38c04774002B4aF104a139bE761d1E61e";
var marketContractAddress="0x33c16292d07E23FF05f28586824A8CAE7E74f6B6";
var biddingContractAddress="0xAa70b943dE5Df0b2983c795fE3414F4adFC94D64";
/* var ERCContractAddress="0xAF88da22af6Bd342d18fd4542F38B4c2Ad78FDF5";
var marketContractAddress="0x7a4A6D478DfebE0B5b65da07d4f2696DE680258C";
var biddingContractAddress="0x47Cd6ac8758bE32F034aE061fe3C90cc316E0a12"; */
var ERC = new web3.eth.Contract(ERCAbi,ERCContractAddress);
var market = new web3.eth.Contract(marketAbi,marketContractAddress);
var bidding = new web3.eth.Contract(biddingAbi,biddingContractAddress);
const account1="0x7f473eE979DC5D5c1fBB871fbd167EfC5eabD903";
const account2="0xd4aD32c5c480cE33923eA8C1Ed14fA5a6f0c58F4";
const privateKey1 = new Buffer.from("","hex");
const privateKey2=new Buffer.from("","hex");
async function runCode(data , account , privateKey,  deployedAddress){
        
  var count = await web3.eth.getTransactionCount(account); 
//console.log(count);
  var Price =  await web3.eth.getGasPrice();
  
 
  var txData = {

          nonce: web3.utils.toHex(count),
          
          
          gasLimit: web3.utils.toHex(2500000),
          
          gasPrice: web3.utils.toHex(Price * 1.40),
          
          to: deployedAddress,                    
 
          from: account,  
          
          data: data
  
  };
          
  var run_code = new TX(txData, {'chain': 'rinkeby'});
  
  run_code.sign(privateKey); //change here 
  
  const serialisedrun_code = run_code.serialize().toString('hex');
  
  const result = await  web3.eth.sendSignedTransaction('0x' + serialisedrun_code);
  console.log(result);

};


   /* function of ERC20 tokens */

async function get_Balance(address){
	try{
	 var data=await ERC.methods.balanceOf(address).call();
   console.log(data);
   return data;
} catch(err){
	 throw{message : "ERROR : NFT not created"};
  }
}
async function approve(_address1,value,_address2,_privatekey){
	try{
	 var data=await ERC.methods.approve(_address1,400).encodeABI();
   var result=await runCode(data,_address2,privateKey1,ERCContractAddress);
   return result;
} catch(err){
	 throw{message : "ERROR : unable to approve user"};
  }
}
async function Transfer(_to,_value, account , privateKey){/////trasnfer token from self to other account
  try{
          let data = await ERC.methods.transfer(_to,_value).encodeABI();
          await runCode(data , account , privateKey , ERCContractAddress);
  }
  catch(e){
    throw{ message : "Transfer not successfull"};
  }
}

     /* function for marketPlace*/

async function buytoken(_address,_tokenamount,_privatekey){
  try{
    let data=await market.methods.buyToken(_tokenamount).encodeABI();
    await runCode(data,_address,_privatekey,marketContractAddress);
  }catch(e){
    throw{ message : "Token not bought"};
  }
}

async function selltoken(_address,_tokenamount,_privatekey){
  try{
    let data=await market.methods.sellToken(_tokenamount).encodeABI();
    await runCode(data,_address,_privatekey,marketContractAddress);
  }catch(e){
    throw{ message : "Token not sold"};
  }
}

/* function for bidding  */

async function addcropforauction(_address1,_address2,_privatekey){
  try{
    let data=await market.methods.addCropForAuction(_address2).encodeABI();
    await runCode(data,_address1,_privatekey,biddingContractAddress);
  }catch(e){
    throw{ message : "Crop not added"};
  }
}

async function lockamount(_address,_privatekey,_cropid,_amount){
  try{
    let data=await market.methods.lockAMount(_cropid,_amount).encodeABI();
    await runCode(data,_address,_privatekey,biddingContractAddress);
  }catch(e){
    throw{ message : "Amount not locked"};
  }
}

async function enterbid(_address,_privatekey,_cropid,_bidamount){
  try{
    let data=await market.methods.enterBid(_cropid,_bidamount).encodeABI();
    await runCode(data,_address,_privatekey,biddingContractAddress);
  }catch(e){
    throw{ message : "Amount not bidded"};
  }
}

async function findhighestbidder(_address,_cropid){
	try{
	 var data=await bidding.methods.findCurrentHighestBidder(_cropid).call({from:_address});
   console.log(data);
   return data;
} catch(err){
	 throw{message : "ERROR : can not fetch data"};
  }
}

async function endAuction(_address,_privatekey,_cropid){
  try{
    let data=await market.methods.endAuction(_cropid).encodeABI();
    await runCode(data,_address,_privatekey,biddingContractAddress);
  }catch(e){
    throw{ message : "can not end auction"};
  }
}

async function getyourbiddings(_address,_cropid){
	try{
	 var data=await bidding.methods.getYourBidding(_cropid).call({from:_address});
   console.log(data);
   return data;
} catch(err){
	 throw{message : "ERROR : can not fetch"};
  }
}


async function getbidderlist(_address,_cropid){
  try{
    var data=await bidding.methods.getBidderList(_cropid).call({from:_address});
    //console.log(data);
    return data;
 } catch(err){
    throw{message : "ERROR : can not fetch"};
   }
}

//get_Balance(account2);
//Transfer(account2, 10, account1, privateKey1);
approve(account2,200,account1,privateKey1);
//buytoken(account2,50,privateKey2);
//selltoken(account2,50,privateKey2);
//addcropforauction(account1,account2,privateKey1);
//lockamount(account2,privatekey2,1,11);
//enterbid(account1,privatekey1,1,20);
//findhighestbidder(account1,1).then(function(number) {  
  //console.log(number)
//});
//endAuction(account1,privatekey1,1);
//getyourbiddings(account1,1);
//getbidderlist(account1,1).then(function(number) {  
 // console.log(number)
//})

