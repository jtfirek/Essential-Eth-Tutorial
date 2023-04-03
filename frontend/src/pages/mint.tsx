// src/pages/mint.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Heading, Text, Box, Button, Input, FormControl, FormLabel, Flex, Spacer } from '@chakra-ui/react';
import { useAccountInfo } from 'utils/accountsLogic';
import { useAccountInfoContext } from 'utils/accountInfoContext';
import NotConnectedPage from './not-connected';
import { deployDappToken, wrapETH } from 'utils/contractFunctions';

const addressERC20 = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const MintPage: NextPage = () => {
  const [tokenName, setTokenName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [amount, setAmount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [isWrapping, setIsWrapping] = useState(false);

  const accountInfo = useAccountInfoContext();
  const { currentAccount, chainName, balance,
    myTokenBalance,
    WETHBalance,
    liquidityTokenBalance,
    getCurrentAccount,
  } = accountInfo;

  // Redirect to NotConnectedPage if there is no current account
  if (!currentAccount) {
    return <NotConnectedPage />;
  }
  
  const handleMint = async (tokenName: string, symbol: string, totalSupply: string) => {
    try {  
      setIsMinting(true);

      let amountMinted = await deployDappToken(tokenName, symbol, totalSupply);
      if(getCurrentAccount !== undefined) {
        console.log("updating account info");
        await getCurrentAccount(amountMinted, undefined, undefined);
      }
      setIsMinting(false);

      alert(`Successfully minted ${amountMinted} tokens!`);
    } catch (error) {
      console.error(error);
      setIsMinting(false);
      alert('Error minting tokens!');
    }
  };

  const handleWrap = async (amount: string) => {
    try {
      setIsWrapping(true);

      let amountWrapped = await wrapETH(amount);

      console.log("updating account info");
      if(getCurrentAccount !== undefined) {
        console.log("updating account info");
        await getCurrentAccount(undefined, amountWrapped, undefined);
      }

      setIsWrapping(false);
    } catch (error) {
      console.error(error);
      setIsWrapping(false);
      alert('Error wrapping ETH!');
    }
  };

  return (
    <>
      <Head>
        <title>Mint Tokens</title>
      </Head>
      <Heading as='h1' size='4xl' textAlign='center' my={4}>
        Mint Tokens
      </Heading>
      <Text textAlign='center' my={4}>
        Mint your own ERC-20 tokens.
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
          Mint a Custom ERC-20 Token
        </Heading>
      <FormControl id='amount' mb={4}>
          <FormLabel>Token Name:</FormLabel>
          <Input
            type='text'
            value={tokenName}
            onChange={(event) => setTokenName(event.target.value)}
            placeholder='MyToken'
          />
        </FormControl>
        <FormControl id='amount' mb={4}>
          <FormLabel> The Token Symbol: </FormLabel>
          <Input
            type='text'
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            placeholder='MTK'
          />
        </FormControl>
        <FormControl id='amount' mb={4}>
          <FormLabel> Token Amount: </FormLabel>
          <Input
            type='text'
            value={totalSupply}
            onChange={(event) => setTotalSupply(event.target.value)}
            placeholder='Enter amount'
          />
        </FormControl>
        
        <Button
          type='button'
          onClick={() => handleMint(tokenName, symbol, totalSupply)}
          // disabled={!currentAccount || isMinting || !amount}
          isLoading={isMinting}
          loadingText='Minting...'
          borderColor='gray.800'
          borderWidth='2px'
        >
          Mint Tokens
        </Button>
      </Box>
      <Box w='100%' p={4} mt={4} ml={2} borderWidth="2px" borderRadius="lg" borderColor="gray.800">
        <Heading my={4} fontSize="xl">
          Wrap ETH to WETH
        </Heading>
        <FormControl id='amount' mb={4}>
          <FormLabel> Amount to Wrap: </FormLabel>
          <Input
            type='number'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder='Enter amount'
          />
        </FormControl>
        <Button
          type='button'
          onClick={() => handleWrap(amount)}
          // disabled={!currentAccount || isMinting || !amount}
          isLoading={isWrapping}
          loadingText='Wrapping...'
          borderColor='gray.800'
          borderWidth='2px'
        >
        Wrap ETH
        </Button>
      </Box>
      </Flex>
      </>
  );
};

export default MintPage;
