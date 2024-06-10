import * as React from 'react';
import {
  Box,
  VStack,
  Heading,
  Flex,
  Text,
  HStack,
  ListItem,
  useColorModeValue,
  ListIcon,
  Divider,
  List
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { CardTransition } from 'components/shared/animations/page-transitions';
import { MotionBox } from 'components/shared/animations/motion';
import moment from 'moment';
import { Tag } from 'components/shared/Tags';
import { AiFillCheckCircle } from 'react-icons/ai';
import { GoIssueReopened } from 'react-icons/go';
import { motion, AnimatePresence } from 'framer-motion';
// import { useLinkColor } from 'components/theme';

const PrList = ({ prList }) => {
  // const linkColor = useLinkColor();
  const textColor = useColorModeValue('gray.500', 'gray.200');


  const convertTime =(seconds , nanosec)=>{
    const timestamp = { seconds, nanosec };
    const formattedDate = moment.unix(timestamp.seconds).format('DD MMM YYYY'); // 'DD MMM YYYY' will give you the date in the format like '03 May 2024'
    return formattedDate;
  } 

  return (
    <AnimatePresence>
      <List>
        {prList?.map((pr, index) => (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: (i) => ({
                opacity: 0,
                y: -30 * i
              }),
              visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.1
                }
              })
            }}
            custom={index}
            key={pr.title}
          >
            <VStack spacing={4} align="left" mx={[0, 0, 6]} mt={8}>
              <ListItem>
                <MotionBox whileHover={{ x: 10 }} key={index} align="left">
                  <CardTransition>
                    <Heading fontSize="lg" textAlign="left" mt={0} mb={1}>
                      {!pr.isDone ? (
                        <ListIcon as={AiFillCheckCircle} color="green.500" />
                      ) : (
                        <ListIcon as={GoIssueReopened} color="gray.500" />
                      )}
                      <NextLink href={pr.title} passHref>
                        {/* <Text as={Link} color={linkColor} target="_blank">
                          {pr.title}
                        </Text> */}
                      </NextLink>
                    </Heading>
                    <HStack spacing={2} isInline ml={[0, 0, 6]}>
                      <Text fontSize="sm" fontWeight="600" color={textColor}>
                        {convertTime(pr.created_at.seconds , pr.created_at.nanoseconds)}
                      </Text>
                      <HStack spacing={1} alignItems="center" display={['none', 'none', 'flex']}>
                        <Flex alignItems="center" flexWrap="wrap" m="-2px">
                          {pr.labels.map((label) => (
                            <Tag
                              key={label}
                              name={label}
                              m="2px"
                              padding="0 3px"
                              size="sm"
                            />
                          ))}
                        </Flex>
                      </HStack>
                    </HStack>
                    <Box fontSize="sm" ml={6} mt={2} className="article">
                      {pr.description}
                    </Box>
                  </CardTransition>
                </MotionBox>
              </ListItem>
              {pr.labels.length - 1 !== index && <Divider />}
            </VStack>
          </motion.div>
        ))}
      </List>
    </AnimatePresence>
  );
};

export default PrList;
