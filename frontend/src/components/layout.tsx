import React, { ReactNode } from 'react';
import { Text, Center, Flex, Spacer } from '@chakra-ui/react';
import Header from './header';
import {
  Box,
  chakra,
  Container,
  Stack,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

type Props = {
  children: ReactNode;
};



export function Layout(props: Props) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Container as="main" maxW="container.md" py="8" flexGrow={1}>
        {props.children}
      </Container>
      <SmallWithSocial />
    </Flex>
  );
}



const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={12}
      h={12}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
      <Flex as='footer' bg={useColorModeValue('gray.100', 'gray.900')} p={4} alignItems='center'>
        <Text > ERC-20 Token Generator by Jacob Firek </Text>
        <Spacer />
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'https://twitter.com/jacob_firek'}>
            <FaTwitter fontSize="1.5rem" />
          </SocialButton>
          <SocialButton label={'linkedin'} href={'https://www.linkedin.com/in/jacob-firek-4423741b8/'}>
            <FaLinkedin fontSize="1.5rem" />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/jtfirek'}>
            <FaGithub fontSize="1.5rem" />
          </SocialButton>
        </Stack>
      </Flex>
  );
}