import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Stack,
  HStack,
  useColorMode,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import PostCard from 'components/blog/card';
import { PageSlideFade, StaggerChildren } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import { MotionBox } from 'components/shared/animations/motion';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from 'components/layouts/pageLayout';

const TURQUOISE = '#06b6d4';

import React from 'react';
import { UserAuth } from '../configs/AuthContext';
import NextLink from 'next/link';

const authentication = () => {
    const { user, logOut } = UserAuth();

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  if(user){
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
                <Button
                  loadingText="Submitting"
                  bg={'blue.400'}
                  color={'black'}
                  _hover={{
                    bg: 'blue.500'
                  }}
                >
                  <NextLink href="/signup" passHref>
                                <a>
                                    Back To Main
                                </a>
                            </NextLink>
                </Button>
              </Stack>
            </HStack>
          </VStack>
        </VStack>
      </PageSlideFade>
    </PageLayout>
  );
};

export default authentication;
