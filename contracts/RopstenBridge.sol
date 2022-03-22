//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract RopstenBridge is BridgeBase{
    constructor(address token) BridgeBase(token){
  }

  /**
    1. Sends tokens to the bridge smart contract.
    1.1 Burns the token.
    1.2 Event is emitted with the details of the transfer (including recipient address and the amount transfered).
    1.3 Bridge API receisves the transfer event.
    1.4 Bridge API sends a transaction to the other Bridge Smart contract.
    1.5 This Bridge mints the same amount of tokens that was destroyed and send it to the recepient address.  
   */
}