import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import OAuthForm from './OAuthForm';

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        NextLink
      }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
    
    return (
        <>

            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={6}>
                    <Box>
                        <FormControl id="email">
                            <FormLabel >Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                    </Box>

                    <FormControl id="email" >
                        <FormLabel>Password</FormLabel>
                        <Input type="email" />
                    </FormControl>

                    <Stack spacing={4} pt={2}>
                        <Button
                            loadingText="Submitting"
                            bg={'black'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Login
                        </Button>
                        <OAuthForm />
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            <NextLink href="/signup" passHref>
                                <a>
                                    New User? SignUp
                                </a>
                            </NextLink>
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}