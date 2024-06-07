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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import OAuthForm from './OAuthForm';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/router';
import { signUpWithEmail } from './auth-server-action/signup';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is Too short",
  }),
  confirmPassword: z.string().min(1, {
    message: "Password confirmation is required",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const result = await signUpWithEmail(data);
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
              <Input type={showPassword ? 'text' : 'password'} {...register('password')} />
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
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
          </FormControl>

          <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
            <FormLabel>Re-enter Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} />
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
            {errors.confirmPassword && <Text color="red.500">{errors.confirmPassword.message}</Text>}
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
              Sign up
            </Button>
            <OAuthForm />
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              <NextLink href="/login" passHref>
                Already a user? Login
              </NextLink>
            </Text>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
