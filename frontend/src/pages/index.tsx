// src/pages/index.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import { useState, useEffect} from 'react'
import {ethers} from "ethers"
import ReadERC20 from "components/ReadERC20"
import TransferERC20 from "components/TransferERC20"
import { useAccountInfoContext } from 'utils/accountInfoContext'


declare let window:any
const addressERC20 = '0x5FbDB2315678afecb367f032d93F642f64180aa3'



  const Home: NextPage = () => {
  // call the useAccountInfo hook
  const accountInfo = useAccountInfoContext();
  const { currentAccount, balance, chainId, chainName, connectMetaMask, disconnectMetaMask } = accountInfo;
 
  const onClickConnect = () => {
    connectMetaMask && connectMetaMask();
  };

  const onClickDisconnect = () => {
    disconnectMetaMask && disconnectMetaMask();
  };

  return (
    <>
      <Head>
        <title>ERC-20 Generator</title>
      </Head>

      <Heading as='h1' size='4xl' textAlign="center" my={4}>Token Creation and Uniswap Liquidity Management</Heading>          
      <Text textAlign="center" my={4}>
  Create your own ERC-20 tokens, wrap ETH into ERC-20s, effortlessly deploy an ERC20/ERC20 Uniswap V2 liquidity pool, and withdraw liquidity with ease
</Text>

      <VStack>
        <Box w='100%' my={4}>
        {currentAccount  
          ? <Button
          type="button"
          w='100%'
          h='50px'
          fontSize='lg'
          onClick={onClickDisconnect}
          borderColor="gray.800"
          borderWidth="2px">
                Account:{currentAccount}
          </Button>
          :  <Button
          type="button"
          w='100%'
          h='50px'
          fontSize='lg'
          onClick={onClickConnect}
          borderColor="gray.800"
          borderWidth="2px"
          >
            Connect MetaMask 
               <Image src="/fox.png" alt="MetaMask Icon" boxSize="24px" mr={2} />
              </Button>
        }
        </Box>

        {currentAccount  
          ?<Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Account info</Heading>
          <Text>ETH Balance of current account: {balance}</Text>
          <Text>Chain Info: ChainId {chainId} name {chainName}</Text>
        </Box>
        :<Text>
        Don't have MetaMask?{' '}
        <NextLink href='https://metamask.io/' passHref>
          <Box as='a' color='blue.500'>
            Get it now.
          </Box>
        </NextLink>
      </Text>
        }
      </VStack>
    </>
  )
}

export default Home