//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

import './WrappedToken.sol';

contract Bridge is Ownable{
  address public admin;
  address public tokenAddress;

  event Claimed(address claimer, uint256 amount, address wrTokenAddress);
  event lockedBridge(address to, uint256 amount, address token);

  ERC20 token;

  mapping(address => mapping(address => uint256)) public tokenHasBeenClaimed;
  mapping(address => address) public nativeToWrapped;

  event Transfer(
    address from,
    address to,
    uint amount,
    uint date
  );
  
  constructor(){
    admin = msg.sender;
  }

  function setERC20ContractAddress(address _address) private {
    token = ERC20(_address);
  }

  function deployToken(address nativeTokenAddress) private /** change to public for testing */ {
    address newWrappedAddress = address( new WrappedToken());
    nativeToWrapped[nativeTokenAddress] = newWrappedAddress;
  }

  function tokenExists(address nativeTokenAddress) private view returns (bool exists) /** change to public for testing */ {
    return nativeToWrapped[nativeTokenAddress] != address(0x0);
  }

  function bridgeToken(address to, uint amount, address _tokenAddress) external {
      require(amount > 0);
      require(_tokenAddress != address(0x0));
      require(to != address(0x0));
      setERC20ContractAddress(_tokenAddress);

      token.approve(address(this), amount); 
      token.transferFrom(msg.sender, address(this), amount); 
      emit Transfer(msg.sender, to, amount, block.timestamp);
  }

  function claimToken(address nativeTokenAddress, uint256 amount) public {
      require( amount > 0, 'Trying to claim 0 tokens.');
      require(nativeTokenAddress != address(0x0));
      
      bool tokenAlreadyExists = tokenExists(nativeTokenAddress);
   
      if(!tokenAlreadyExists){
        deployToken(nativeTokenAddress);
      }

      address wrappedTokenAddress = nativeToWrapped[nativeTokenAddress];
      WrappedToken wrTkn = WrappedToken(wrappedTokenAddress);
      wrTkn.mint(msg.sender, amount);
      tokenHasBeenClaimed[wrappedTokenAddress][msg.sender] = amount;
      emit Claimed(msg.sender, amount, wrappedTokenAddress);
  }

  function releaseTokens(address contractAddress, uint256 amount) public{
    require(amount > 0, 'Positive amount of tokens');
    setERC20ContractAddress(contractAddress);
    token.approve(msg.sender, amount);
  }

}