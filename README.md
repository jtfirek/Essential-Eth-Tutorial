# Mint-Swap-dApp

My Dapp enables users to create their own ERC-20 tokens, wrap ETH into ERC-20s, deploy an ERC20/ERC20 Uniswap V2 liquidity pool, and withdraw liquidity using a metamask wallet.

# Project Structure 

## Forge Directory 

- `GeneralToken.sol`: ERC-20 contract with built in Uniswap V2 methods.
[GeneralToken.sol](forge/src/GeneralToken.sol)

- `Poot.t.sol`: Testing Uniswaping V2 methods in a forked environmemt.
[GeneralToken.sol](forge/test/Pool.t.sol)

## Frontend
 
- Built with React, Next.js, Chakra UI, and ether.js. 

- I embedded the `GeneralToken.sol` ABI and bytecode into the frontend to allow the user to deploy an instance of the contract from the UI

- 👷‍♂️: Only the depolying of the ERC-20 works currently. I am still working on calling the other methods from the frontend.
