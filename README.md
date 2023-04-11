# Mint-Swap-dApp

I was playing around with forge tests to deploy and swap in Uniswap V2 liquitly pools. [Link to Example File](./forge-tests/test/Pool.t.sol). I got curious about front end interact with smart contract so I have been building a fullstack dApp.

My Dapp enables users to create their own ERC-20 tokens, wrap ETH into ERC-20s, deploy an ERC20/ERC20 Uniswap V2 liquidity pool, and withdraw liquidity using a metamask wallet.


# Project Structure

- `forge-tests`: playing around with doing things with erc-20s in Uniswap in a forked evironment. Then I wrote a ERC-20 contract with Uniswap V2 functionality built in.
- `Frontend`: built with React, Next.js, Chakra UI, and ether.js
- `backend`: Node.js server with a GraphQL gateway
- `contracts`: deployed Solidity smart contracts
- `migrates`: scripts for deploying contracts


