//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

import "hardhat/console.sol";
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

  function mint() external{}
// transferFrom(msg.sender, address(this), amount)
}