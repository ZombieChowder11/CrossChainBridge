const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // not used.
  const networkName = hre.network.name; //await ethers.getDefaultProvider().getNetwork();

  if(networkName === 'ropsten'){
    const tokenRopsten = await ethers.getContractFactory("RopstenToken"); 
    const tokenRopstenContract = await tokenRopsten.deploy();
    await tokenRopstenContract.deployed();
    await tokenRopstenContract.mint(deployer.getAddress(), 1000);

    const wrToken = await ethers.getContractFactory("WrappedToken"); 
    const wrTokenContract = await wrToken.deploy();
    await wrTokenContract.deployed();
    
    const bridgeRopsten = await ethers.getContractFactory("Bridge"); 
    const bridgeRopstenContract = await bridgeRopsten.deploy();
    await bridgeRopstenContract.deployed();

    console.log("Token address:", tokenRopstenContract.address);
    console.log("Bridge Ropsten:", bridgeRopstenContract.address);
    console.log("Wrapped Token Address:", wrTokenContract.address);
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  }

  if(networkName === 'rinkeby'){
    const tokenRinkeby = await ethers.getContractFactory("RinkebyToken"); 
    const tokenRinkebyContract = await tokenRinkeby.deploy();
    await tokenRinkebyContract.deployed();
    await tokenRinkebyContract.mint(deployer.getAddress(), 1000);

    const wrToken = await ethers.getContractFactory("WrappedToken"); 
    const wrTokenContract = await wrToken.deploy();
    await wrTokenContract.deployed();
    
    const bridgeRinkeby = await ethers.getContractFactory("Bridge"); 
    const bridgeRinkebyContract = await bridgeRinkeby.deploy();
    await bridgeRinkebyContract.deployed();

    console.log("Token address:", tokenRinkebyContract.address);
    console.log("Bridge Rinkeby:", bridgeRinkebyContract.address);
    console.log("Wrapped Token Address:", wrTokenContract.address);
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
