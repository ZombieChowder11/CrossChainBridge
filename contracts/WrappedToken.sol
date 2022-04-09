//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract WrappedToken is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("WrappedToken", "wrTkn"){}

    // function mint(address to, uint amount) external payable override{
    //     transferFrom(msg.sender, address(this), amount);
    //     _mint(to, amount);
    // }

    // function burn(uint amount) external {
    //     transfer(msg.sender, amount);
    //     //payable(msg.sender).transfer(amount);
    //     _burn(msg.sender, amount);
    // }

}