// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { VStack, Heading, Box } from '@chakra-ui/layout';
import { Text, Button, Image } from '@chakra-ui/react';
import { useAccountInfoContext } from 'utils/accountInfoContext';

// declare a global variable to avoid TypeScript errors with the window object
declare let window: any;
const addressERC20 = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Home: NextPage = () => {
  // call the useAccountInfo hook
  const accountInfo = useAccountInfoContext();
  const {
    currentAccount,
    balance,
    chainId,
    chainName,
    connectMetaMask,
    disconnectMetaMask,
  } = accountInfo;

  // handle connecting to MetaMask
  const onClickConnect = () => {
    connectMetaMask && connectMetaMask();
  };

  // handle disconnecting from MetaMask
  const onClickDisconnect = () => {
    disconnectMetaMask && disconnectMetaMask();
  };

  return (
    <>
      <Head>
        <title>ERC-20 Generator</title>
      </Head>

      <Heading as="h1" size="4xl" textAlign="center" my={4}>
        Token Creation and Uniswap Liquidity Management
      </Heading>
      <Text textAlign="center" my={4}>
        Create your own ERC-20 tokens,
        deploy an ERC20/ETH Uniswap V2 liquidity pool, swap tokens, and withdraw liquidity on the Goerli Testnet.
      </Text>

      <VStack>
        {/* Show connected account or Connect MetaMask button */}
        <Box w="100%" my={4}>
          {currentAccount ? (
            <Button
              type="button"
              w="100%"
              h="50px"
              fontSize="lg"
              onClick={onClickDisconnect}
              borderColor="gray.800"
              borderWidth="2px"
            >
              Account: {currentAccount}
            </Button>
          ) : (
            <Button
              type="button"
              w="100%"
              h="50px"
              fontSize="lg"
              onClick={onClickConnect}
              borderColor="gray.800"
              borderWidth="2px"
            >
              Connect MetaMask
              <Image
                src="/fox.png"
                alt="MetaMask Icon"
                boxSize="24px"
                mr={2}
              />
            </Button>
          )}
        </Box>

        {/* Show account info or MetaMask download link */}
        {currentAccount ? (
          <Box mb={0} p={4} w="100%" borderWidth="2px" borderRadius="lg" borderColor="gray.800">
            <Heading my={4} fontSize="xl">
              Account Information
            </Heading>
            <Text> Chain Name: {chainName} </Text>
            <Text>ETH Balance: {balance}</Text>
            <Text> Balance of Custom Token: 0 </Text>
          </Box>
        ) : (
          <Text>
            Don't have MetaMask?{' '}
            <NextLink href="https://metamask.io/" passHref>
              <Box as="a" color="blue.500">
                Get it now.
              </Box>
            </NextLink>
          </Text>
        )}
      </VStack>
    </>
  );
};

export default Home;
