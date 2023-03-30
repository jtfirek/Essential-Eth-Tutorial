// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";


contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
    }
}

// contract DeployScript is Script {
//     function setUp() public {}

//     function run() public {
//         uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
//         vm.startBroadcast(deployerPrivateKey);
//         uint256 initialSupply = 1e28; // 1 million tokens in atomic notation
//         new MyToken(initialSupply);
//         vm.stopBroadcast();
//     }
// }
