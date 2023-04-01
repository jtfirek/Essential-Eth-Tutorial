//src/components/header.tsx
import NextLink from "next/link"
import { Flex, Button, useColorModeValue, Spacer, Heading, LinkBox, LinkOverlay , Box} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import { useAccountInfoContext } from 'utils/accountInfoContext';
import { useEffect } from "react";



const siteTitle="Token Generator"
export default function Header() {
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
    <Flex as='header' bg={useColorModeValue('gray.100', 'gray.900')} p={4} alignItems='center'>
      <Heading size="md">{siteTitle}</Heading>
      <Box  mx="auto" >
      <NextLink href="/" passHref>
        <Button as="a" variant="ghost" mr={2}>
          Home
        </Button>
      </NextLink>
      <NextLink href="/mint" passHref>
        <Button as="a" variant="ghost" mr={2}>
          Mint
        </Button>
      </NextLink>
      <NextLink href="/swap" passHref>
        <Button as="a" variant="ghost" mr={2}>
          Swap
        </Button>
      </NextLink>
      </Box>
      <Box>
        {currentAccount
          ? 
            <Button
              borderColor="gray.800"
              borderWidth="2px"
              onClick={onClickDisconnect}
            >
            Disconnect
            </Button>
          :
          <Button
            borderColor="gray.800"
            borderWidth="2px"
            onClick={onClickConnect}
          >
            Connect
            </Button>
        }
      </Box>
    </Flex>
  )
}
