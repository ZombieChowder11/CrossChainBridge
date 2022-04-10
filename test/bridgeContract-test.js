const { expect } = require("chai");

describe('RopstenBridge', function () {
  let bridgeFactory;
  let bridgeBase;
  let wrToken;
  let owner;
  let user2;
  
    before(async () => {
      wrTokenFactory = await ethers.getContractFactory("WrappedToken");
      wrToken = await wrTokenFactory.deploy();
      await wrToken.deployed();

      bridgeFactory = await ethers.getContractFactory("RinkebyBridge");
      bridgeBase = await bridgeFactory.deploy();
      await bridgeBase.deployed();

      [owner, user2] = await ethers.getSigners();
  });

  //getter + imeto na mapping 


  it("Should emit Transfer with given args", async function () {
    //await wrToken.connect(user2).approve(owner.getAddress(), 10000)
    //await wrToken.connect(owner).burnFrom(user2.getAddress(), 50);
    await wrToken.mint(user2.getAddress(), 1000);
    await wrToken.connect(user2).approve(owner.getAddress(), 1000)
    await wrToken.connect(owner).transferFrom(user2.getAddress(), owner.getAddress(), 50);

    console.log("user2", await wrToken.balanceOf(user2.getAddress()))
    console.log("owner", await wrToken.balanceOf(owner.getAddress()))

    console.log("bridgeBase", await wrToken.balanceOf(bridgeBase.address))
    console.log("wrToken", await wrToken.balanceOf(wrToken.address))
    //bridgeToken(address to, uint amount, address _tokenAddress) 
    //emit Transfer(msg.sender, to, amount, block.timestamp);
    // expect(await bridgeBase.bridgeToken(bridgeBase.address, 50, wrToken.address))
    //   .to.emit(Transfer)
    //   .withArgs(user2.getAddress(), bridgeBase.address, 50, block.timestamp);
  });



});