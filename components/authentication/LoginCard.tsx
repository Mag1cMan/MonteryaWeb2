import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import OAuthForm from './OAuthForm';

export default function LoginCard() {
  return (
    <>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <Stack spacing={6}>
          <Box>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
          </Box>

          <FormControl id="email">
            <FormLabel>Password</FormLabel>
            <Input type="email" />
          </FormControl>

          <Stack spacing={4} pt={2}>
            <Button
              loadingText="Submitting"
              bg={'black'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
            >
              Login
            </Button>
            <OAuthForm />
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              <Link href="/signup" passHref>
                <a>New User? SignUp</a>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
