import {
  Button,
  Stack,
  HStack,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';

import PageLayout from 'components/layouts/pageLayout';

const TURQUOISE = '#06b6d4';

import React from 'react';
import { UserAuth } from '../configs/AuthContext';
import Link from 'next/link';

const authentication = () => {
  const { user, logOut } = UserAuth();
 useColorModeValue('gray.100', 'gray.700');

  if (user) {
    logOut();
  }
  return (
    <PageLayout title="Open-source" keywords="A list of open source projects">
      <PageSlideFade>
        <VStack align="center" spacing={4}>
          <VStack width={'100%'} align="center">
            {' '}
            {/* Use VStack instead of HStack */}
            <Header underlineColor={TURQUOISE} mt={0} mb={0}>
              Logged Out
            </Header>
            <HStack>
              <Stack spacing={4} pt={2}>
                <Link href="/" passHref>
                  <Button
                    as="a" // This makes the Button behave like an <a> tag
                    loadingText="Submitting"
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                      color: 'black'
                    }}
                  >
                    Back To Main
                  </Button>
                </Link>
              </Stack>
            </HStack>
          </VStack>
        </VStack>
      </PageSlideFade>
    </PageLayout>
  );
};

export default authentication;
