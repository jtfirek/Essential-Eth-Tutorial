//src/components/header.tsx
import NextLink from "next/link"
import { Flex, Button, useColorModeValue, Spacer, Heading, LinkBox, LinkOverlay , Box} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';

const siteTitle="ERC-20 Token Generator"
export default function Header() {

  return (
    <Flex as='header' bg={useColorModeValue('gray.100', 'gray.900')} p={4} alignItems='center'>
      <Heading size="md">{siteTitle}</Heading>
      <Box  mx="auto" >
      <NextLink href="/" passHref>
        <Button as="a" variant="ghost" mr={2}>
          Home
        </Button>
      </NextLink>
      <NextLink href="/learn" passHref>
        <Button as="a" variant="ghost" mr={2}>
          Learn
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
      <Button
      borderColor="gray.800"
      borderWidth="2px"
      > Connect 
      </Button>
    </Flex>
  )
}
