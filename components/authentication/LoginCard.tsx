import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import OAuthForm from './OAuthForm';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signInWithEmail } from './auth-server-action/signup';
import NextLink from 'next/link';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6 , {
    message: "Password is Too short",
  })
});



export default function LoginCard() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const result = await signInWithEmail(data);
      const { status, error } = JSON.parse(result);
      if (status !== 200) {
        toast({
          title: "Signup Failed",
          description: error,
          position: 'bottom-right',
          status: "warning",
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Successful",
          position: 'bottom-right',
          status: "success",
          isClosable: true,
        });
        router.push('/');
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        position: 'bottom-right',
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
  
<Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Box>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register('email')} />
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>
          </Box>

          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type="password" {...register('password')} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                >
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
          </FormControl>

        

          <Stack spacing={4} pt={2}>
            <Button
              loadingText="Submitting"
              bg={'black'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
              isLoading={isSubmitting}>
              Login
            </Button>
            <OAuthForm />
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              <NextLink href="/signup" passHref>
                Not a user? SignUp!
              </NextLink>
            </Text>
          </Stack>
        </Stack>
      </form>
    </Box>  );
}
