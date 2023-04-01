// src/pages/not-connected.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { VStack, Heading, Text, Box, Button } from '@chakra-ui/react';
import { useAccountInfo } from 'utils/accountsLogic';
import NextLink from 'next/link';

const NotConnectedPage: NextPage = () => {
  const { connectMetaMask } = useAccountInfo();

  return (
    <>
      <Head>
        <title>Not Connected</title>
      </Head>
      <VStack spacing={4} alignItems='center'>
        <Heading as='h1' size='4xl' textAlign='center' my={4}>
          Connect to MetaMask
        </Heading>
        <Text textAlign='center'>
          You must be connected to a MetaMask wallet to use these features. Return to the home page to connect. {' '}
          <NextLink href='/' passHref>
            <Box as='a' color='blue.500'>
              Home Page
            </Box>
          </NextLink>
        </Text>
      </VStack>
    </>
  );
};

export default NotConnectedPage;
