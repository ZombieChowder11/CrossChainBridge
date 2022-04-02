// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const TokenRopsten = require('../artifacts/contracts/RopstenToken.sol/RopstenToken.json');
const BridgeRopsten = require('../artifacts/contracts/RopstenBridge.sol/RopstenBridge.json');

const TokenRinkeby = require('../artifacts/contracts/RinkebyToken.sol/RinkebyToken.json');
const BridgeRinkeby = require('../artifacts/contracts/RinkebyBridge.sol/RinkebyBridge.json');

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

  // await greeter.deployed();

  // console.log("Greeter deployed to:", greeter.address);

  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name; //await ethers.getDefaultProvider().getNetwork();

  //TODO: Replace hardcoded strings with env
  if(networkName === 'ropsten'){
    // await deployer.deploy(TokenRopsten);
    const tokenRopsten = await ethers.getContractFactory(TokenRopsten); 
    const tokenRopstenContract = await tokenRopsten.deploy();
    await tokenRopstenContract.deployed();
    //const tokenRopsten = await TokenRopsten.deployed();

    await tokenRopsten.mint(address[0], 1000);
    await deployer.deploy(BridgeRopsten);
    const bridgeRopsten = await BridgeRopsten.deployed();
    await tokenRopsten.updateAdmin(bridgeRopsten.address);
    console.log("Token address:", tokenRopsten.address);
  }

  if(networkName === 'rinkeby'){
    await deployer.deploy(TokenRinkeby);
    const tokenRinkeby = await TokenRinkeby.deployed();
    await tokenRinkeby.mint(address[0], 1000);
    await deployer.deploy(BridgeRinkeby);
    const bridgeRinkeby = await BridgeRinkeby.deployed();
    await TokenRinkeby.updateAdmin(bridgeRinkeby.address);
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
