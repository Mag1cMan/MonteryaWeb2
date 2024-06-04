import { Button , Flex, Spinner, Icon} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useToast } from '@chakra-ui/react'
import { UserAuth } from "../../configs/AuthContext";
import { useRouter } from 'next/router';

export default function OAuthForm() {
    const [isPending, setIsPending] = useState(false);
    const toast = useToast()
    const { googleSignIn} = UserAuth();
    const router = useRouter();

    const goToSignUp = () => {
      router.push('/#');
    };
  


    const handleLoginWithGoogle = () => {
      setIsPending(true);
      // Simulating an asynchronous operation (e.g., API call)
      setTimeout(async () => {
          // After the operation is done, set isPending to false
          setIsPending(false);
          await googleSignIn();
          // Call googleSignIn or any other function\
          goToSignUp();
  
          toast({
              title: `Google Login Successful`,
              position: 'bottom-right',
              status: "success",
              isClosable: true,
          });
  
      }, 1000);
  }

    return (
        <>
            <Button
      bg={isPending ? "red.500" : "black"}
      color="white"
      _hover={{ bg: "red.500" }}
      onClick={handleLoginWithGoogle}
      disabled={isPending}
      position="relative"
    >
      {isPending ? (
        <Spinner
          thickness="3px"
          speed="0.65s"
          emptyColor="white"
          color="black"
          position="absolute"
          transform="translate(-50%, -50%)"
        />
      ) : (
        <Flex alignItems="center">
          <Icon as={FaGoogle} boxSize={6} mr={2} />
          Login With Google
        </Flex>
      )}
    </Button>

        </>
    );

}
