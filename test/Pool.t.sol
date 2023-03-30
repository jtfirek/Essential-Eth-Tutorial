// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MyToken.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "v2-core/interfaces/IUniswapV2Factory.sol"; // Uniswap V2 Factory
import "v2-periphery/interfaces/IUniswapV2Router02.sol"; // Uniswap V2 Router
import "v2-periphery/interfaces/IWETH.sol";
import {Utils} from "./utils/Utils.sol";


contract PoolTest is Test {
    // using utils to create my account
    Utils internal utils;
    address payable[] internal users;
    address internal me;
    // Uniswap V2 Router
    address internal uniRouterAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 internal uniRouter;
    // Uniswap V2 Factory
    address internal UNISWAP_FACTORY_ADDRESS = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    IUniswapV2Factory internal uniswapFactory;
    // Wrapped Ether instance
    IWETH weth;
    // MyToken instance
    MyToken internal myToken;

    function setUp() public {
        // create user with 100 ETH balance
        utils = new Utils();
        users = utils.createUsers(1);
        me = users[0];
        vm.label(me, "Me");

        // Deploy MyToken and get token address
        myToken = new MyToken();
        address myTokenAddress = address(myToken);

        /// create instance of the UniswapV2Factory interface which allows us to interact with the Uniswap V2 Factory
        uniswapFactory = IUniswapV2Factory(UNISWAP_FACTORY_ADDRESS);

        // create instance of the UniswapV2Router02 interface
        uniRouter = IUniswapV2Router02(uniRouterAddress);

        // Create an instance of the IWETH interface which allows us to interact with the WETH contract
        weth = IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

        // mint 1 million tokens to the me
        // 1e6 = 1 million, 1 ERC20 = 1e18 atomic units
        // 1e6 * 1e18 = 1e24
        myToken.mint(me, 1e24);

        // Create pool using factory address to include MyToken/WETH
        uniswapFactory.createPair(address(weth), myTokenAddress);
    }

    function test_setup() public {
        // check balance of my account
        address myTokenAddress = address(myToken);
        uint256 balance = ERC20(myTokenAddress).balanceOf(me);
        assertEq(balance, 1e24, "Balance should be 1 million");

        // check if the pool exists
        address pairAddress = uniswapFactory.getPair(address(weth), myTokenAddress);
        assertTrue(pairAddress != address(0), "Pair address should not be 0");
    }

    function testAddLiquidity() public {

        // switch context to the me account to add liquidity 50 WETH, 1 million MyToken
        vm.startPrank(me);

        // approve the router allowance of my tokens and wrap eth
        myToken.approve(address(uniRouter), 1e24);
        weth.deposit{value: 50 ether}();
        weth.approve(address(uniRouter), 50 ether);

        // add liquidity to pool
        uniRouter.addLiquidity(
            address(myToken), // address of the liquidity pool
            address(weth), // address of WETH
            1e24, // amount of token to add
            20 ether, // amount of WETH to add
            0, // no minimum amount of WETH to add
            0, // no minimum amount of token to add
            me, // recipient of the liquidity tokens
            block.timestamp
        );
        vm.stopPrank();

    }

    function testRemoveLiquidity() public {
        // Remove liquidity to pool here
    }

    function testSwap() public {
        // Perform a swap in the liquidity pool
    }
}
