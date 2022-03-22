//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract RinkebyBridge is BridgeBase{
  constructor(address token) BridgeBase(token){
  }
}