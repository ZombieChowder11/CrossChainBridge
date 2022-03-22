//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './TokenBase.sol';

contract RopstenToken is TokenBase {
  constructor() TokenBase('Ropsten Example Token', 'RopET') {}
}