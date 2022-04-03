// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

const RinkebyBridge = require('../artifacts/contracts/RinkebyBridge.sol/RinkebyBridge.json');
const RinkebyToken = require('../artifacts/contracts/RinkebyToken.sol/RinkebyToken.json');

const RopstenBridge = require('../artifacts/contracts/RopstenBridge.sol/RopstenBridge.json');
const RopstenToken = require('../artifacts/contracts/RopstenToken.sol/RopstenToken.json');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // not used.
  const networkName = hre.network.name; //await ethers.getDefaultProvider().getNetwork();

  if(networkName === 'ropsten'){
    const tokenRopsten = await ethers.getContractFactory(RopstenToken); 
    const tokenRopstenContract = await tokenRopsten.deploy();
    await tokenRopstenContract.deployed();
    await tokenRopsten.mint(address[0], 1000);

    const bridgeRopsten = await ethers.getContractFactory(RopstenBridge); 
    const bridgeRopstenContract = await bridgeRopsten.deployed();
    await bridgeRopstenContract.deployed();
    console.log("Token address:", tokenRopsten.address);
  }

  if(networkName === 'rinkeby'){
    const tokenRinkeby = await ethers.getContractFactory(RinkebyToken); 
    const tokenRinkebyContract = await RinkebyToken.deployed();
    await tokenRinkebyContract.deployed();
    await tokenRinkeby.mint(address[0], 1000);

    const bridgeRinkeby = await ethers.getContractFactory(RinkebyBridge); 
    const bridgeRinkebyContract = await bridgeRinkeby.deploy();
    await bridgeRinkebyContract.deployed();
    console.log("Token address:", tokenRinkeby.address);
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
