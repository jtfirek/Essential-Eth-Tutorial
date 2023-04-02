// src/pages/mint.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Heading, Text, Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useAccountInfo } from 'utils/accountsLogic';
import { useAccountInfoContext } from 'utils/accountInfoContext';
import NotConnectedPage from './not-connected';

const addressERC20 = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const MintPage: NextPage = () => {

  // call the useAccountInfo hook
  const accountInfo = useAccountInfoContext();
  const { currentAccount } = accountInfo;
  

  if (!currentAccount) {
    // redirect to not connected page if there is no current account
    return <NotConnectedPage />;
  }
  const { currentAccount } = useAccountInfo();
  const [amount, setAmount] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    try {
      setIsMinting(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(addressERC20, ['function mint(address to, uint256 amount)'], signer);

      const tx = await contract.mint(currentAccount, ethers.utils.parseEther(amount));
      await tx.wait();

      setAmount('');
      setIsMinting(false);

      alert(`Successfully minted ${amount} tokens!`);
    } catch (error) {
      console.error(error);
      setIsMinting(false);
      alert('Error minting tokens!');
    }
  };

  // return (
  //   <>
  //     <Head>
  //       <title>Mint Tokens</title>
  //     </Head>
  //     <Heading as='h1' size='4xl' textAlign='center' my={4}>
  //       Mint Tokens
  //     </Heading>
  //     <Text textAlign='center' my={4}>
  //       Mint your own ERC-20 tokens.
  //     </Text>
  //     <Box w='100%' p={4} borderWidth='1px' borderRadius='lg'>
  //       <FormControl id='amount' mb={4}>
  //         <FormLabel>Token Name:</FormLabel>
  //         <Input
  //           type='number'
  //           value={amount}
  //           onChange={(event) => setAmount(event.target.value)}
  //           placeholder='MyToken'
  //         />
  //       </FormControl>
  //       <FormControl id='amount' mb={4}>
  //         <FormLabel> The Token Symbol: </FormLabel>
  //         <Input
  //           type='number'
  //           value={amount}
  //           onChange={(event) => setAmount(event.target.value)}
  //           placeholder='MTK'
  //         />
  //       </FormControl>
  //       <FormControl id='amount' mb={4}>
  //         <FormLabel> Token Amount: </FormLabel>
  //         <Input
  //           type='number'
  //           value={amount}
  //           onChange={(event) => setAmount(event.target.value)}
  //           placeholder='Enter amount'
  //         />
  //       </FormControl>
        
  //       <Button
  //         type='button'
  //         onClick={handleMint}
  //         disabled={!currentAccount || isMinting || !amount}
  //         isLoading={isMinting}
  //         loadingText='Minting...'
  //         borderColor='gray.800'
  //         borderWidth='2px'
  //       >
  //         Mint Tokens
  //       </Button>
  //     </Box>
  //   </>
  // );
};

export default MintPage;
