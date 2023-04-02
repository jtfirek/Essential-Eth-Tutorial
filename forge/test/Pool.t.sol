// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MyToken.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "v2-core/interfaces/IUniswapV2Factory.sol"; // Uniswap V2 Factory
import "v2-periphery/interfaces/IUniswapV2Router02.sol"; // Uniswap V2 Router
import "v2-periphery/interfaces/IWETH.sol";
import {Utils} from "./utils/Utils.sol";

/**
 * @title PoolTest
 * @dev This contract tests the functionality of MyToken and Uniswap V2 pool interactions.
 */
contract PoolTest is Test {
    // Utils instance for creating user
    Utils internal utils;
    address payable[] internal users;
    address internal me;

    // Uniswap V2 Router
    address internal immutable UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 internal uniRouter;

    // Uniswap V2 Factory
    address internal immutable UNISWAP_FACTORY_ADDRESS = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    IUniswapV2Factory internal uniswapFactory;

    // Wrapped Ether instance
    IWETH internal weth;
    // MyToken instance
    MyToken internal myToken;


    /**
     * @dev Set up the test environment, including creating user accounts, deploying MyToken,
     * and initializing Uniswap V2 Router and Factory contracts.
     */
    function setUp() public {
        // Create user with 100 ETH balance
        utils = new Utils();
        users = utils.createUsers(1);
        me = users[0];
        vm.label(me, "Me");

        // Deploy MyToken and get token address
        myToken = new MyToken();
        address myTokenAddress = address(myToken);

        // Create instance of the UniswapV2Factory interface to interact with the Uniswap V2 Factory
        uniswapFactory = IUniswapV2Factory(UNISWAP_FACTORY_ADDRESS);

        // Create instance of the UniswapV2Router02 interface
        uniRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);

        // Create an instance of the IWETH interface to interact with the WETH contract
        weth = IWETH(uniRouter.WETH());

        // Mint 1 million tokens for the user, accounting for the decimal places in the ERC20 token
        uint256 tokenAmount = 1e6 * 10**myToken.decimals();
        myToken.mint(me, tokenAmount);

        // Create pool using factory address to include MyToken/WETH
        uniswapFactory.createPair(address(weth), myTokenAddress);
    }

    /**
     * @dev Test the initial setup of the contract.
     */
    function test_setup() public {
        // Assert that the initial balance of the user is 1 million tokens
        uint256 userBalance = myToken.balanceOf(me);
        uint256 expectedBalance = 1e24;
        assertEq(userBalance, expectedBalance, "User balance should be 1 million tokens");

        // Assert that the token pair is created in the Uniswap factory
        address tokenPairAddress = uniswapFactory.getPair(address(weth), address(myToken));
        bool tokenPairExists = tokenPairAddress != address(0);
        assertTrue(tokenPairExists, "Token pair address should not be 0");
    }

    /**
     * @dev Test adding liquidity to the MyToken/WETH pool.
     * This function simulates the process of adding liquidity and checks if the
     * liquidity provider receives the correct amount of liquidity tokens.
     */
    function testAddLiquidity() public {
        // Switch context to the me account to add liquidity 50 WETH, 1 million MyToken
        vm.startPrank(me);

        // Approve the router allowance of my tokens and wrap eth
        myToken.approve(address(uniRouter), 1e24);
        weth.deposit{value: 50 ether}();
        IERC20(address(weth)).approve(address(uniRouter), 50 ether);

        // Add liquidity to pool
        (,, uint256 liquidity) = uniRouter.addLiquidity(
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

        // Check if the user account received the liquidity tokens
        address pairAddress = uniswapFactory.getPair(address(weth), address(myToken));
        uint256 balance = ERC20(pairAddress).balanceOf(me);

        assertEq(balance, liquidity, "Balance should be equal to liquidity");
    }

    /**
     * @dev Test removing liquidity from the MyToken/WETH pool.
     * This function simulates the process of removing liquidity and checks if the
     * liquidity provider receives the correct amount of tokens.
     */
    function testRemoveLiquidity() public {
        // Add liquidity first
        testAddLiquidity();
        address pairAddress = uniswapFactory.getPair(address(weth), address(myToken));

        // Record balances before removing liquidity
        uint256 myTokenBalanceBefore = ERC20(address(myToken)).balanceOf(me);
        uint256 wethBalanceBefore = ERC20(address(weth)).balanceOf(me);
        uint256 liquidityTokenBalanceBefore = ERC20(pairAddress).balanceOf(me);
        assertTrue(liquidityTokenBalanceBefore != 0, "Assert that liquidity was successfully added");

        // Switch context to the me account to remove liquidity
        vm.startPrank(me);

        // Get the liquidity token contract
        ERC20 liquidityToken = ERC20(pairAddress);

        // Approve the router to spend liquidity tokens
        uint256 liquidity = liquidityToken.balanceOf(me);
        liquidityToken.approve(address(uniRouter), liquidity);

        // Remove liquidity from the pool
        (uint256 amountMyToken, uint256 amountWETH) = uniRouter.removeLiquidity(
            address(myToken),
            address(weth),
            liquidity,
            0, // no minimum amount of myToken
            0, // no minimum amount of WETH
            me,
            block.timestamp
        );
        vm.stopPrank();

        // Checking to make the sure the balances are correct
        uint256 liquidityTokenBalanceAfter = ERC20(pairAddress).balanceOf(me);
        assertTrue(liquidityTokenBalanceAfter == 0, "Assert that liquidity tokens are removed");

        uint256 myTokenBalanceAfter = ERC20(address(myToken)).balanceOf(me);
        uint256 wethBalanceAfter = ERC20(address(weth)).balanceOf(me);
        assertEq(myTokenBalanceAfter, myTokenBalanceBefore + amountMyToken, "Assert that myToken balance is correct");
        assertEq(wethBalanceAfter, wethBalanceBefore + amountWETH, "Assert that WETH balance is correct");
    }

    /**
     * @dev Test swapping tokens using the Uniswap router.
     * This function simulates the process of swapping tokens and checks if the
     * recipient receives the correct amount of tokens.
     */
    function testSwap() public {
        // Add liquidity first
        testAddLiquidity();

        // Switch context to the user account to execute the swap
        vm.startPrank(me);

        // Give router an allowance of at least amountInMax on the input token.
        uint256 wethToSwap = 1 ether;
        IERC20(address(weth)).approve(address(uniRouter), wethToSwap);

        // Execute the swap
        address[] memory path = new address[](2);
        path[0] = address(weth);
        path[1] = address(myToken);
        uint256[] memory amounts = uniRouter.swapExactTokensForTokens(
            wethToSwap, // input amount of WETH to swap
            0, // no minimum output amount
            path, // path from WETH to MyToken
            me, // recipient of the output tokens
            block.timestamp
        );

        vm.stopPrank();

        uint256 inputAmountWeth = amounts[0];
        uint256 outputAmountMyToken = amounts[1];
        uint256 myTokenBalanceAfter = ERC20(address(myToken)).balanceOf(me);

        // Check if the swap was successful
        assertEq(inputAmountWeth, wethToSwap, "Assert that input amount of WETH is correct");
        assertEq(outputAmountMyToken, myTokenBalanceAfter, "Assert that output amount of MyToken is correct");
    }
}
