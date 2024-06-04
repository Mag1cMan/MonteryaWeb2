import {
  HStack,
  VStack,
} from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import PageLayout from 'components/layouts/pageLayout';

const TURQUOISE = '#06b6d4';
import React from 'react';
import SignupCard from 'components/authentication/SignupCard';

const authentication = () => {

  return (
    <PageLayout title="Open-source" keywords="A list of open source projects">
      <PageSlideFade>
        <VStack align="center" spacing={4}>
          <HStack width={'100%'}>
            <Header underlineColor={TURQUOISE} mt={0} mb={0}>
              SignUp
            </Header>
            <HStack></HStack>
          </HStack>

          <SignupCard />
        </VStack>
      </PageSlideFade>
    </PageLayout>
  );
};

export default authentication;
