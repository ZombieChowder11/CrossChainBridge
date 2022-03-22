//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

import './IToken.sol';

contract BridgeBase {
  address public admin;
  IToken public token;
  uint public canceled;
  mapping(uint => bool) public paymentCanceled;

  enum Step { Burn, Mint }
  event Transfer(
    address from,
    address to,
    uint amount,
    uint date,
    uint canceled,
    Step indexed step
  );

  constructor(address _token){
    admin = msg.sender;
    token = IToken(_token);
  }

  function burn(address to, uint amount) external{
    token.burn(msg.sender, amount);
    emit Transfer(msg.sender, to, amount, block.timestamp, canceled, Step.Burn);
    canceled++;
  }

  function mint(address to, uint amount, uint otherChainCanceled) external{
    require(msg.sender == admin, 'admin');
    require(paymentCanceled[otherChainCanceled]);
    paymentCanceled[otherChainCanceled] = true;
    token.mint(to, amount);
    emit Transfer(msg.sender, to, amount, block.timestamp, otherChainCanceled, Step.Mint);
  }

}