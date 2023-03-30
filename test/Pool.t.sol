// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MyToken.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "v2-core/interfaces/IUniswapV2Factory.sol"; // Uniswap V2 Factory

contract PoolTest is Test {
    address uniRouterAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    function setUp() public {
        // 1e6 = 1 million 
        // 1 ERC20 = 1e18 atomic units
        // 1e6 * 1e18 = 1e24
        MyToken mytoken = new MyToken(1e24);

        // Create pool using factory address to include MyToken/WETH

    }

    function testAddLiquidity() public {
        // Add liquidity to pool here
    }

    function testRemoveLiquidity() public {
        // Remove liquidity to pool here
    }

    function testSwap() public {
        // Perform a swap in the liquidity pool
    }
}
