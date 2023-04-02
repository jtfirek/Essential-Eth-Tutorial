// src/pages/swap.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Text, Box, Flex  } from '@chakra-ui/react';

import NotConnectedPage from './not-connected';
import { useAccountInfoContext } from 'utils/accountInfoContext';

const SwapPage: NextPage = () => {
  // Call the useAccountInfo hook
  const accountInfo = useAccountInfoContext();
  const { currentAccount, chainName, balance } = accountInfo;

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
      <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
              Account Information
            </Heading>
            <Text> Chain Name: {chainName} </Text>
            <Text>ETH Balance: {balance}</Text>
            <Text> Balance of Custom Token: 0 </Text>
      </Box>
      <Flex direction="row" >
        <Box w="50%" borderWidth="1px" borderRadius="lg">
          This is the first box
        </Box>
        <Box w="50%" borderWidth="1px" borderRadius="lg">
          This is the second box
        </Box>
    </Flex>
    </>
  );
};

export default SwapPage;
