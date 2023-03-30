// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        this;
    }

    // Function to mint new tokens
    function mint(address to, uint256 amount) public {
        // Call the inherited mint function
        _mint(to, amount);
  }

}