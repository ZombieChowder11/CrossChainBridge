//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract WrappedToken is ERC20 {
    constructor() ERC20("Wrapped Token", "wrTkn"){}

    function mint(address to, uint amount) external payable{
        transferFrom(msg.sender, address(this), amount);
        _mint(to, amount);
    }

    function burn(uint amount) external {
        transfer(msg.sender, amount);
        payable(msg.sender).transfer(amount);
        _burn(msg.sender, amount);
    }

}