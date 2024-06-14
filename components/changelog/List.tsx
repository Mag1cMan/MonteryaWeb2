import * as React from 'react';
import {
  Box,
  VStack,
  Flex,
  Text,
  ListItem,
  ListIcon,
  List,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Accordion,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { CardTransition } from 'components/shared/animations/page-transitions';
import { MotionBox } from 'components/shared/animations/motion';
import { AiFillCheckCircle } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
// import { useLinkColor } from 'components/theme';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesUp,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { IoBandageSharp } from 'react-icons/io5';

const PrList = ({ prList }) => {
  // const linkColor = useLinkColor();
  const textColor = 'gray.200';

  const iconMap: { [key: string]: React.ReactElement } = {
    HotFix: (<ListIcon as={FontAwesomeIcon} icon={faScrewdriverWrench} color="#FF5733" boxSize={6} />),
    NewFeature: <ListIcon as={FontAwesomeIcon} icon={faAnglesUp} color="#FFD700" boxSize={6} />,
    Patching: <ListIcon as={IoBandageSharp} color="#22c55e" boxSize={6} />
  };

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
            key={pr.id}
          >
            <VStack spacing={4} align="left" mx={[0, 0, 6]} mt={8}>
              <ListItem>
                <MotionBox whileHover={{ x: 10 }} key={index} align="left">
                  <CardTransition>
                    <Flex alignItems="center" mt={5}>
                      {iconMap[pr.updateType] || <AiFillCheckCircle color="gray.500" />}
                      <NextLink href={pr.updateType} passHref>
                        <Link target="_blank" fontSize="lg" fontWeight="bold" ml={4} mr={6}>
                        {pr.updateType} v {pr.version}
                        </Link>
                      </NextLink>
                      <Text fontSize="sm" fontWeight="600" color={textColor} mr={6}>
                        {pr.date}
                      </Text>
                    </Flex>

                    <Accordion mt={3} allowMultiple>
                      {/* Bug Fixes */}
                      {pr.bugFixes.length > 0 && (
                        <AccordionItem>
                          {({ isExpanded }) => (
                            <>
                              <h2>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="left">
                                    Bug Fixes
                                  </Box>
                                  {isExpanded ? (
                                    <MinusIcon fontSize="12px" />
                                  ) : (
                                    <AddIcon fontSize="12px" />
                                  )}
                                </AccordionButton>
                              </h2>
                              <AccordionPanel fontSize="16px" pb={6}>
                                {pr.bugFixes.map((fix, index) => (
                                  <div key={index}>{fix}</div>
                                ))}
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      )}

                      {/* Improvements */}
                      {pr.improvements.length > 0 && (
                        <AccordionItem>
                          {({ isExpanded }) => (
                            <>
                              <h2>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="left">
                                    Improvements
                                  </Box>
                                  {isExpanded ? (
                                    <MinusIcon fontSize="12px" />
                                  ) : (
                                    <AddIcon fontSize="12px" />
                                  )}
                                </AccordionButton>
                              </h2>
                              <AccordionPanel fontSize="16px" pb={6}>
                                {pr.improvements.map((improvement, index) => (
                                  <div key={index}>{improvement}</div>
                                ))}
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      )}

                      {/* New Features */}
                      {pr.NewFeatures.length > 0 && (
                        <AccordionItem>
                          {({ isExpanded }) => (
                            <>
                              <h2>
                                <AccordionButton>
                                  <Box as="span" flex="1" textAlign="left">
                                    New Features
                                  </Box>
                                  {isExpanded ? (
                                    <MinusIcon fontSize="12px" />
                                  ) : (
                                    <AddIcon fontSize="12px" />
                                  )}
                                </AccordionButton>
                              </h2>
                              <AccordionPanel fontSize="16px" pb={6}>
                                {pr.NewFeatures.map((feature, index) => (
                                  <div key={index}>{feature}</div>
                                ))}
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      )}
                    </Accordion>
                  </CardTransition>
                </MotionBox>
              </ListItem>
              {/* {pr.labels.length - 1 !== index && <Divider />} */}
            </VStack>
          </motion.div>
        ))}
      </List>
    </AnimatePresence>
  );
};

export default PrList;
