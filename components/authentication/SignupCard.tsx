import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import OAuthForm from './OAuthForm';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>

      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={6}>
          <Box>
            <FormControl id="email" >
              <FormLabel >Email address</FormLabel>
              <Input type="email" />
            </FormControl>
          </Box>

          <FormControl id="email" >
            <FormLabel>Password</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" >
            <FormLabel>Re Enter Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={4} pt={2}>
            <Button
              loadingText="Submitting"
              bg={'black'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign up
            </Button>
            <OAuthForm/>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>

            <NextLink href="/login" passHref>
                {/* Content goes here */}
                Already a user? Login
            </NextLink>


            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}