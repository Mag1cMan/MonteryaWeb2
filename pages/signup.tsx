import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Text,
  HStack,
  useColorMode,
  useColorModeValue,
  VStack,
  Center
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
import { BiSearch } from 'react-icons/bi';
import { getDbPosts, getDevtoPosts } from 'lib/fetchPosts';

const TURQUOISE = '#06b6d4';

import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import SignupCard from 'components/authentication/SignupCard';

const authentication = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
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
