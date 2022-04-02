//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract RinkebyToken is ERC20 {
  constructor() ERC20('Rinkeby Example Token', 'RinET') {}
}