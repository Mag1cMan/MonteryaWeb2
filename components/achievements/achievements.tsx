import * as React from 'react';
import {
  FiSettings,
  FiGitBranch,
  FiRotateCcw,
  FiStar
} from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';
import { VStack, Heading, Box, Link, LinkProps } from '@chakra-ui/react';
import { TimelineItem } from './Timeline';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import NextLink from 'next/link';
import { useLinkColor } from 'components/theme';

interface ExternalLinkProps extends LinkProps {
  url: string;
  linkProps?: LinkProps;
  text: string;
}

const InternalLink: React.FC<ExternalLinkProps> = ({ url, linkProps, text, ...props }) => {
  return (
    <NextLink href={url} passHref>
      <Link {...linkProps} {...props}>
        {text}
      </Link>
    </NextLink>
  );
};
const Achievements = () => {
  const linkColor = useLinkColor();

  return (
    <PageSlideFade>
      <Box textAlign="start" mb={6}>
        <Header mt={0} mb={0}>
          New Year Plan
        </Header>
      </Box>
      <VStack textAlign="start" align="start" mb={5}>
        <Box zIndex={5}>
          <Heading fontSize="2xl" fontWeight="600" my={5}>
            2025
          </Heading>
          <Box>
            <TimelineItem icon={FaTools}>Update new website</TimelineItem>
            <TimelineItem icon={FiRotateCcw}>
              Add New Features Machinery , achivements , new gameplay
            </TimelineItem>
            <TimelineItem icon={FaTools}>
              Finish 3 More Maps
            </TimelineItem>
            <TimelineItem icon={FiGitBranch}> Internal testing & open Beta </TimelineItem>
            <TimelineItem icon={FiSettings}> Bug Fixes </TimelineItem>

          </Box>
        </Box>
      </VStack>

      <Box textAlign="start" mb={6}>
        <Header mt={0} mb={0}>
          Achievements
        </Header>
      </Box>
      <VStack textAlign="start" align="start" mb={5}>
        <Box zIndex={5}>
          <Heading fontSize="2xl" fontWeight="600" my={5}>
            2024
          </Heading>
          <Box>
            <TimelineItem icon={FaTools}>Update new website</TimelineItem>
            <TimelineItem icon={FiRotateCcw}>
              RollBack functions and Improve Internal System
            </TimelineItem>
            <TimelineItem icon={FaTools}>
              Intregate new system Read more here{' '}
              <InternalLink color={linkColor} url="/changelog" text={'Patch Notes'} />
            </TimelineItem>
            <TimelineItem icon={FiGitBranch}>Publish On website</TimelineItem>
            <TimelineItem icon={FiSettings}>New GamePlay Design</TimelineItem>
            <TimelineItem icon={FiStar} skipTrail>
              New art styles and more
            </TimelineItem>
          </Box>
        </Box>
      </VStack>
    </PageSlideFade>
  );
};

export default Achievements;
