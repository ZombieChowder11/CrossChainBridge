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


  it("Should emit Transfer with given args.", async function () {
    await wrToken.mint(owner.getAddress(), 1000);
    await wrToken.connect(bridgeBase.signer).approve(owner.getAddress(), 1000)
    await wrToken.connect(owner).approve(bridgeBase.address, 1000)
    await wrToken.connect(bridgeBase.signer).transferFrom(owner.getAddress(), bridgeBase.address, 200);

   expect(await bridgeBase.bridgeToken(owner.getAddress(), 50, wrToken.address))
      .to.emit(bridgeBase, "Transfer")
      .withArgs(owner.getAddress(), bridgeBase.address, 50, 1460714400); 
  });


  it("Should a wrapped token form the native token address.", async function () {
    let rinkebyTokenFactory = await ethers.getContractFactory("RinkebyToken");
    let rinkebyToken = await rinkebyTokenFactory.deploy();
    await rinkebyToken.deployed();

    await bridgeBase.deployToken(rinkebyToken.address)
   
    await bridgeBase.nativeToWrapped(wrToken.address)
   
  });


  it("Should check if token exists based on the native to wrapped address.", async function () {
    const newNativeToWrappedAddr = await bridgeBase.nativeToWrapped(wrToken.address)
    
    expect(await bridgeBase.tokenExists(newNativeToWrappedAddr)).to.equal(false)
  })
});