// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MyToken.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 initialSupply = 1e28; // 1 million tokens in atomic notation
        MyToken mytoken = new MyToken(initialSupply); // 
        vm.broadcast(); // collects state change function calls to be executed
    }
}
