const { expect } = require("chai");

describe('RopstenBridge', function () {
  let ropstenBridgeFactory;
  let ropstenBridge;
  let wrToken;
  
    before(async () => {
      acc = await ethers.getSigners();

      wrTokenFactory = await ethers.getContractFactory("WrappedToken");
      wrToken = await wrTokenFactory.deploy();
      await wrToken.deployed();

      ropstenBridgeFactory = await ethers.getContractFactory("RopstenBridge");
      ropstenBridge = await ropstenBridgeFactory.deploy();
      await ropstenBridge.deployed();
  });

  //getter + imeto na mapping 
});