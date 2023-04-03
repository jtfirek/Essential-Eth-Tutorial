// src/pages/swap.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Text, Box, Flex, FormControl, FormLabel, Input, Button, Select  } from '@chakra-ui/react';

import NotConnectedPage from './not-connected';
import { useAccountInfoContext } from 'utils/accountInfoContext';

const SwapPage: NextPage = () => {
  // Call the useAccountInfo hook
  const accountInfo = useAccountInfoContext();
  const { currentAccount, chainName, balance,
    myTokenBalance,
    WETHBalance,
    liquidityTokenBalance,} = accountInfo;

  // Redirect to NotConnectedPage if there is no current account
  if (!currentAccount) {
    return <NotConnectedPage />;
  }

  return (
    <>
      <Head>
        <title>Liquidity Management</title>
      </Head>
      <Heading as="h1" size="4xl" textAlign="center" my={4}>
        Liquidity Management
      </Heading>
      <Text textAlign="center" my={4}>
        Deploy an ERC20/WETH Uniswap V2 Liquidity Pool, Swap, and Withdraw
        Liquidity
      </Text>
      <Box mb={0} p={4} w="100%" borderWidth="2px" borderRadius="lg" borderColor="gray.800">
            <Heading my={4} fontSize="xl">
              Account Information
            </Heading>
            <Text> Chain Name: {chainName} </Text>
            <Text>ETH Balance: {balance}</Text>
            <Text> Balance of WETH: {WETHBalance} </Text>
            <Text> Balance of Custom Token: {myTokenBalance} </Text>
            <Text> Balance of Liquidity Token: {liquidityTokenBalance} </Text>
      </Box>
      <Flex direction="row" >
      <Box w='100%' p={4} mt={4} mr={2} borderWidth="2px" borderRadius="lg" borderColor="gray.800">
        <Heading my={4} fontSize="xl">
          Provide Liquidity
        </Heading>
        <FormControl id='amount' mb={4}>
          <FormLabel> Amount of Wrapped ETH: </FormLabel>
          <Input
            type='number'
            // value={}
            // onChange={(event) => setAmount(event.target.value)}
            placeholder='Enter amount'
          />
        </FormControl>
        <FormControl id='amount' mb={4}>
          <FormLabel> Amount of Custom ERC-20: </FormLabel>
          <Input
            type='number'
            // value={amount}
            // onChange={(event) => setAmount(event.target.value)}
            placeholder='Enter amount'
          />
        </FormControl>
        
        <Button
          type='button'
          // onClick={handleMint}
          // disabled={!currentAccount || isMinting || !amount}
          // isLoading={isMinting}
          loadingText='Minting...'
          borderColor='gray.800'
          borderWidth='2px'
        >
          Desposit Liquidity
        </Button>
      </Box>
      <Box w='100%' p={4} mt={4} ml={2} borderWidth="2px" borderRadius="lg" borderColor="gray.800">
        <Heading my={4} fontSize="xl">
          Swap in the Liquidity Pool
        </Heading>
        <FormControl mb={4}>
        <FormLabel>Swap Type</FormLabel>
          <Select placeholder='Select Swap Type'>
            <option>Swap Custom ECR-20 for WETH</option>
            <option>Swap WETH for Custom ECR-20</option>
          </Select>
        </FormControl>
        <FormControl id='amount' mb={4}>
          <FormLabel> Swap Input Amount: </FormLabel>
          <Input
            type='number'
            // value={amount}
            // onChange={(event) => setAmount(event.target.value)}
            placeholder='Enter amount'
          />
        </FormControl>
        <Button
          type='button'
          // onClick={handleMint}
          // disabled={!currentAccount || isMinting || !amount}
          // isLoading={isMinting}
          loadingText='Minting...'
          borderColor='gray.800'
          borderWidth='2px'
        >
        Swap Tokens
        </Button>
      </Box>
      </Flex>
    </>
  );
};

export default SwapPage;
