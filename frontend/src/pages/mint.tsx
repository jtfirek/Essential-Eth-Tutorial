// src/pages/mint.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Heading, Text, Box, Button, Input, FormControl, FormLabel, Flex, Spacer } from '@chakra-ui/react';
import { useAccountInfo } from 'utils/accountsLogic';
import { useAccountInfoContext } from 'utils/accountInfoContext';
import NotConnectedPage from './not-connected';

const addressERC20 = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const MintPage: NextPage = () => {

  const accountInfo = useAccountInfoContext();
  const { currentAccount, chainName, balance } = accountInfo;

  // Redirect to NotConnectedPage if there is no current account
  if (!currentAccount) {
    return <NotConnectedPage />;
  }
  // const { currentAccount } = useAccountInfo();
  // const [amount, setAmount] = useState('');
  // const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    // try {
    //   setIsMinting(true);

    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();

    //   const contract = new ethers.Contract(addressERC20, ['function mint(address to, uint256 amount)'], signer);

    //   const tx = await contract.mint(currentAccount, ethers.utils.parseEther(amount));
    //   await tx.wait();

    //   setAmount('');
    //   setIsMinting(false);

    //   alert(`Successfully minted ${amount} tokens!`);
    // } catch (error) {
    //   console.error(error);
    //   setIsMinting(false);
    //   alert('Error minting tokens!');
    // }
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
            <Text> Balance of Custom ERC-20: 0 </Text>
            <Text> Balance of Custom ERC-20: 0 </Text>
      </Box>
      <Flex direction="row" >
      <Box w='100%' p={4} mt={4} mr={2} borderWidth="2px" borderRadius="lg" borderColor="gray.800">
        <Heading my={4} fontSize="xl">
          Mint a Custom ERC-20 Token
        </Heading>
      <FormControl id='amount' mb={4}>
          <FormLabel>Token Name:</FormLabel>
          <Input
            type='number'
            // value={amount}
            // onChange={(event) => setAmount(event.target.value)}
            placeholder='MyToken'
          />
        </FormControl>
        <FormControl id='amount' mb={4}>
          <FormLabel> The Token Symbol: </FormLabel>
          <Input
            type='number'
            // value={amount}
            // onChange={(event) => setAmount(event.target.value)}
            placeholder='MTK'
          />
        </FormControl>
        <FormControl id='amount' mb={4}>
          <FormLabel> Token Amount: </FormLabel>
          <Input
            type='number'
            // value={amount}
            // onChange={(event) => setAmount(event.target.value)}
            placeholder='Enter amount'
          />
        </FormControl>
        
        <Button
          type='button'
          onClick={handleMint}
          // disabled={!currentAccount || isMinting || !amount}
          // isLoading={isMinting}
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
