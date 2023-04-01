// src/pages/swap.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Spinner, Text, Center } from '@chakra-ui/react';
import NotConnectedPage from './not-connected';
import { useAccountInfoContext } from 'utils/accountInfoContext';

const SwapPage: NextPage = () => {
    // call the useAccountInfo hook
    const accountInfo = useAccountInfoContext();
    const { currentAccount } = accountInfo;
   

    if (!currentAccount) {
      // redirect to not connected page if there is no current account
      return <NotConnectedPage />;
    }

  return (
    <>
      <Head>
        <title>Liquidity Management</title>
      </Head>
      <Heading as='h1' size='4xl' textAlign='center' my={4}>
        Liquidity Management
      </Heading>
      <Text textAlign='center' my={4}>
      Deploy an ERC20/WETH Uniswap V2 Liquidity Pool, Swap, and Withdraw Liquidity
      </Text>
      {/* rest of the page content */}
    </>
  );
};

export default SwapPage;
