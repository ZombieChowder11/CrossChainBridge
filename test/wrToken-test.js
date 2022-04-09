const { expect } = require("chai");

describe('WrappedToken', function () {
  let wrToken;
  let owner;
  let user2;

  before(async () => {
    wrTokenFactory = await ethers.getContractFactory("WrappedToken");
    wrToken = await wrTokenFactory.deploy();
    await wrToken.deployed();

    [owner,user2] = await ethers.getSigners();
  })

  it("Should deploy the token contract with the given name", async function () {
    expect(await wrToken.name()).to.equal('WrappedToken');
  });

  it("Should deploy the token contract with the given symbol", async function () {
    expect(await wrToken.symbol()).to.equal('wrTkn');
  });

  it('Should mint given amount of tokens', async function(){
    await wrToken.mint(user2.getAddress(), 10000);
  });

  it('Should burn given amount of tokens', async function(){
    await wrToken.connect(user2).approve(owner.getAddress(), 10000)
    await wrToken.connect(owner).burnFrom(user2.getAddress(), 50);
  })

});