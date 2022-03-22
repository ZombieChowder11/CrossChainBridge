//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './TokenBase.sol';

contract RinkebyToken is TokenBase {
  constructor() TokenBase('Rinkeby Example Token', 'RinET') {}
}