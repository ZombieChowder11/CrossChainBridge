const hre = require("hardhat");
const ethers = hre.ethers;

const Bridge = require('../artifacts/contracts/Bridge.sol/Bridge.json');
const RinkebyToken = require('../artifacts/contracts/RinkebyToken.sol/RinkebyToken.json');
const RopstenToken = require('../artifacts/contracts/RopstenToken.sol/RopstenToken.json');
const WrappedToken =  require('../artifacts/contracts/WrappedToken.sol/WrappedToken.json');

async function main() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // not used.
  const networkName = hre.network.name; //await ethers.getDefaultProvider().getNetwork();

  if(networkName === 'ropsten'){
    const tokenRopsten = await ethers.getContractFactory(RopstenToken); 
    const tokenRopstenContract = await tokenRopsten.deploy();
    await tokenRopstenContract.deployed();
    await tokenRopsten.mint(address[0], 1000);

    const wrToken = await ethers.getContractFactory(WrappedToken); 
    const wrTokenContract = await wrToken.deploy();
    await wrTokenContract.deployed();
    
    const bridgeRopsten = await ethers.getContractFactory(Bridge); 
    const bridgeRopstenContract = await bridgeRopsten.deployed();
    await bridgeRopstenContract.deployed();
    console.log("Token address:", tokenRopsten.address);
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  }

  if(networkName === 'rinkeby'){
    const tokenRinkeby = await ethers.getContractFactory(RinkebyToken); 
    const tokenRinkebyContract = await RinkebyToken.deployed();
    await tokenRinkebyContract.deployed();
    await tokenRinkeby.mint(address[0], 1000);

    const wrToken = await ethers.getContractFactory(WrappedToken); 
    const wrTokenContract = await wrToken.deploy();
    await wrTokenContract.deployed();
    
    const bridgeRinkeby = await ethers.getContractFactory(Bridge); 
    const bridgeRinkebyContract = await bridgeRinkeby.deploy();
    await bridgeRinkebyContract.deployed();
    console.log("Token address:", tokenRinkeby.address);
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  //npx hardhat run --network rinkeby scripts/sample-script.js
