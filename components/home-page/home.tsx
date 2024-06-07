import { useEffect, useState } from 'react';
import { Flex, Avatar, Box, AspectRatio, Link, Image, Text ,Button, SimpleGrid, useMediaQuery, HStack } from '@chakra-ui/react';
import { MotionBox, MotionFlex } from 'components/shared/animations/motion';
import Header from 'components/shared/header';
// import { useLinkColor } from 'components/theme';
// import PopularArticles from './PopularArticles';
import { BlogPostProps } from 'interfaces/interface';
import AutoSliderShow from 'components/shared/AutoSliderShow';
import { ChakraProvider } from '@chakra-ui/react';
import { linkColors } from 'components/theme/colors';
import NextLink from 'next/link'

const images = [
  { src: '/rabbit_nobg.png', alt: 'Image 1' },
  { src: '/yinglong_nobg.png', alt: 'Image 2' },
  { src: '/estech_nogb.png', alt: 'Image 3' }
];
const ANIMATION_DURATION = 0.5;
const ORANGE = '#ff9400';
// const emojis = ['👋', '👍', '🖐'];
const gifUrl = '/assets/icons/Coin.gif';

const link = [
  { name: 'PatchNotes', path: '/changelog' },
  { name: 'Login', path: '/login' },
  { name: 'SignUp', path: '/signup' }
];

// const Home: React.FC<BlogPostProps> = (props) => {

const Home: React.FC<BlogPostProps> = () => {
  const [emojiCounter, setEmojiCounter] = useState(-1);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  useEffect(() => {
    const interval = setInterval(() => {
      if (emojiCounter >= 3) setEmojiCounter(0);
    }, 500);
    return () => clearInterval(interval);
  }, [emojiCounter]);

  const [coins, setCoins] = useState([]);

  const handleClick = () => {
    const id = Date.now();
    setCoins((prevCoins) => [...prevCoins, id]);

    setTimeout(() => {
      setCoins((prevCoins) => prevCoins.filter((coinId) => coinId !== id));
    }, 1000); // duration of the coin animation in milliseconds
  };

  return (
    <Flex direction="column" align="center" h="75vh">
      <MotionBox
        w="100%"
        opacity="0"
        initial={{
          translateX: 150,
          opacity: 0
        }}
        animate={{
          translateX: 0,
          opacity: 1,
          transition: {
            duration: ANIMATION_DURATION
          }
        }}
        zIndex={1}
      >
        <Box>
          <AutoSliderShow />
        </Box>
      </MotionBox>

      <Flex direction={['column', 'column', 'row']}>
        <MotionBox
          opacity="0"
          initial={{
            translateX: 150,
            opacity: 0
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: {
              duration: ANIMATION_DURATION
            }
          }}
          m="auto"
          mb={[16, 16, 'auto']}
        >
          {isLargerThan800 && (
          <MotionBox whileHover={{ scale: 1.2 }}>
            <Avatar size={'2xl'} src={'/MT_icon.png'} />
          </MotionBox>
        )}
        </MotionBox>

        <MotionFlex
          position="relative"
          ml={['auto', 'auto', 16]}
          m={['auto', 'initial']}
          w={['90%', '85%', '80%']}
          maxW="800px"
          opacity="0"
          justify="center"
          direction="column"
          initial={{
            opacity: 0,
            translateX: 150
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              duration: ANIMATION_DURATION
            }
          }}
        >
          <Box mt={10} position="relative">
            <Box position="absolute" width="full" fontSize="2xl" textAlign="center">
              {coins.map((id) => (
                <MotionBox
                  key={id}
                  position="absolute"
                  right="68%"
                  animate="show"
                  variants={{
                    hide: { translateY: -80, opacity: 0 },
                    show: {
                      translateY: [0, -40, -20],
                      opacity: [0, 1, 0]
                    }
                  }}
                  initial="hide"
                >
                  <img src={gifUrl} alt="gold coin" width="50" height="50" />
                </MotionBox>
              ))}
            </Box>
            <MotionBox whileHover={{ translateY: -5 }} width="max-content">
              <Header
                underlineColor={ORANGE}
                mt={0}
                cursor="pointer"
                width="max-content"
                onClick={handleClick}
                alignItems="center" // Ensure this value is in quotes
              >
                Monterya
              </Header>
            </MotionBox>
          </Box>
          <Box as="h2" fontSize="xm" fontWeight="400" textAlign="left">
            Join us for the adventure that is coming this year - The Monterya Official 2024!
          </Box>
        </MotionFlex>
      </Flex>

      <MotionBox
        w="100%"
        opacity="0"
        initial={{
          translateY: 80
        }}
        animate={{
          translateY: 0,
          opacity: 1,
          transition: {
            delay: ANIMATION_DURATION - 0.1,
            duration: ANIMATION_DURATION
          }
        }}
        zIndex={1}
      >
        <Box mt={10}>
          {/* <ContentBox linkColor={linkColors} /> */}
          {/* <PopularArticles posts={posts} hidden/> */}

          {/* <MotionFlex
            position="relative"
            ml={['auto', 'auto', 16]}
            m={['auto', 'initial']}
            w={['90%', '85%', '80%']}
            maxW="800px"
            opacity="0"
            justify="center"
            direction="row"
            initial={{
              opacity: 0,
              translateX: 170
            }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: {
                duration: ANIMATION_DURATION
              }
            }}
          ></MotionFlex> */}
        </Box>


          {/* Read this more article for more context when you want to read udpate of the patch notes */}

        <HStack justifyContent="center" width="100%">
        <NextLink href="/blog" passHref>
          <HStack spacing={2} as={Link} color={linkColors}>
            <Text fontSize="sm">More Articles</Text>
            
          </HStack>
        </NextLink>
      </HStack>

      </MotionBox>
    </Flex>
  );
};



export default Home;

