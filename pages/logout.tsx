import React from 'react';
import { useColorModeValue, Button, VStack } from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import PageLayout from 'components/layouts/pageLayout';
import { UserAuth } from '../configs/AuthContext';
import Link from 'next/link';

const TURQUOISE = '#06b6d4';

const Authentication = () => {
  const { user, logOut } = UserAuth();
  const buttonColor = useColorModeValue('blue.500', 'blue.200');

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
