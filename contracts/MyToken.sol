// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EXTToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Example token", "EXT") {
        _mint(msg.sender, initialSupply);
        _setupDecimals(0);
    }
}