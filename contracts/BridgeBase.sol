//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

import "hardhat/console.sol";
import './IToken.sol';

contract BridgeBase {
  address public admin;
  IToken public token;
  
  constructor(address _token){
    admin = msg.sender;
    token = IToken(_token);
  }

// transferFrom(msg.sender, address(this), amount)
}