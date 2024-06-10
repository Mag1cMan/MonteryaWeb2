import React from 'react';
import {  Button, VStack } from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import PageLayout from 'components/layouts/pageLayout';
import { UserAuth } from '../configs/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TURQUOISE = '#06b6d4';

const Authentication = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  // const buttonColor = useColorModeValue('blue.500', 'blue.200');
  if(!user){
    router.push('/');
  }
  const handleLogout = () => {
    logOut();
  };

  handleLogout();
  return (
    <PageLayout title="Open-source" keywords="A list of open source projects">
      <PageSlideFade>
        <VStack align="center" spacing={4} width="100%">
          <Header underlineColor={TURQUOISE} mt={0} mb={0}>
            Logged Out
          </Header>
          <VStack align="center" spacing={4} width="100%">
            <Link href="/" passHref>
              <Button
                as="a"
                colorScheme="blue"
                _hover={{
                  bg: 'blue.500',
                  color: 'black'
                }}
                onClick={null}
              >
                Back To Main
              </Button>
            </Link>
          </VStack>
        </VStack>
      </PageSlideFade>
    </PageLayout>
  );
};

export default Authentication;
