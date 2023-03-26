//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint constant _initial_supply = 100 * (10 ** 18);

    constructor(address safe) ERC20("MyToken", "MT") {
        _mint(safe, _initial_supply);
    }
}
