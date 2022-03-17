//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract TokenBase is ERC20{
  address public admin;

  constructor(string memory name, string memory symbol) ERC20(name, symbol){
    admin = msg.sender;
  }

  function updateAdmin(address newAdmin) external {
    require(msg.sender == admin, 'owner');
    admin = newAdmin;
  }

  function mint(address to, uint amount) external {
    require(msg.sender == admin, 'owner');
    _mint(to, amount);
  }

  function burn(address owner, uint amount) external {
    require(msg.sender == admin, 'owner');
    _burn(owner, amount);
  }

}