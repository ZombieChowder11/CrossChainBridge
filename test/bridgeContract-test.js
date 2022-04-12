const { expect } = require("chai");

describe('RopstenBridge', function () {
  let bridgeFactory;
  let bridgeBase;
  let wrToken;
  let rinkebyTokenFactory;
  let rinkebyToken;

  let owner;
  let user2;
  
    before(async () => {
      wrTokenFactory = await ethers.getContractFactory("WrappedToken");
      wrToken = await wrTokenFactory.deploy();
      await wrToken.deployed();

      bridgeFactory = await ethers.getContractFactory("RinkebyBridge");
      bridgeBase = await bridgeFactory.deploy();
      await bridgeBase.deployed();

      rinkebyTokenFactory = await ethers.getContractFactory("RinkebyToken");
      rinkebyToken = await rinkebyTokenFactory.deploy();
      await rinkebyToken.deployed();

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
    await bridgeBase.deployToken(rinkebyToken.address)
    await bridgeBase.nativeToWrapped(wrToken.address)
  });


  it("Should check if token exists based on the native to wrapped address.", async function () {
    const newNativeToWrappedAddr = await bridgeBase.nativeToWrapped(wrToken.address)
    
    expect(await bridgeBase.tokenExists(newNativeToWrappedAddr)).to.equal(false)
  });

  it("Should claim tokens provided the native token address doesnt exist.", async function () {
    let rinkebyTokenFactory = await ethers.getContractFactory("RinkebyToken");
    let rinkebyToken = await rinkebyTokenFactory.deploy();
    await rinkebyToken.deployed();

    const tokenAlreadyExists =  await bridgeBase.tokenExists(rinkebyToken.address);

    if(!tokenAlreadyExists){
      await bridgeBase.deployToken(rinkebyToken.address);
    }

    expect(await bridgeBase.claimToken(rinkebyToken.address, 50))
    .to.emit(bridgeBase, "Claimed")
    .withArgs(owner.getAddress(), 50, wrToken.address); 
  })

  it("Should claim tokens provided the native token address exists.", async function () {
    let ropstenTokenFactory = await ethers.getContractFactory("RopstenToken");
    let ropstenToken = await ropstenTokenFactory.deploy();
    await ropstenToken.deployed();

    const tokenAlreadyExists =  await bridgeBase.tokenExists(ropstenToken.address);

    if(!tokenAlreadyExists){
      await bridgeBase.deployToken(wrToken.address);
    }

    expect(await bridgeBase.claimToken(ropstenToken.address, 50))
    .to.emit(bridgeBase, "Claimed")
    .withArgs(owner.getAddress(), 50, wrToken.address); 
  });

  it("Should release tokens with provided token address and amount.", async function(){
    await bridgeBase.releaseTokens(rinkebyToken.address, 50);
    await rinkebyToken.approve(owner.getAddress(), 50)
  })

});