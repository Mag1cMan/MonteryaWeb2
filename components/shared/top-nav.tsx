import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Text,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { ColorModeSwitcher } from '../theme/ColorModeSwitcher';
import { AiTwotoneThunderbolt } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { CgArrowsExchange } from 'react-icons/cg';
import { BsCheckCircle } from 'react-icons/bs';
import { MdTimeline } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AccentPicker } from 'components/theme/Accent';
import { useLinkColor } from 'components/theme';
import { MotionBox } from 'components/shared/animations/motion';
import { UserAuth } from '../../configs/AuthContext';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const webLinks = [
  { name: 'PatchNotes', path: '/changelog' },
  { name: 'Wiki', path: '/blog' }
];

const startGameLink = [{ name: 'Start', path: '/game' }];

const signup = [
  { name: 'SignUp', path: '/signup' },
  { name: 'Login', path: '/login' }
];

const mobileLinks = [
  { name: 'Home', path: '/' },
  { name: 'PatchNotes', path: '/changelog' },
  { name: 'SignUp', path: '/signup' },
  { name: 'Login', path: '/login' }
];
const dropdownLinks = [
  { name: 'Projects', path: '/projects' },
  { name: 'Tech Stack', path: '/tech-stack' },
  { name: 'Open Source', path: '/open-source' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Changelog', path: '/changelog' }
  // { name: "Developer Story", path: "/developer-story" }
];
const profiledropdownLinks = [
  { name: 'UserProfile', path: '/#' },
  { name: 'Transaction', path: '/#' },
  { name: 'Bug Report', path: '/#' },
  { name: 'Logout', path: '/logout' }
];

interface NavLinkProps {
  index?: number;
  name: string;
  path: string;
  linkColor: string;
  onClose: () => void;
}

const NavLink = (props: NavLinkProps) => {
  const router = useRouter();
  const link = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    color: useColorModeValue('blue.500', 'blue.200')
  };

  return (
    <NextLink href={props.path} passHref>
      <Link
        px={3}
        py={1}
        lineHeight="inherit"
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: link.bg,
          // color: props.linkColor
          color: 'white'
        }}
        bg={router.pathname === props.path ? link.bg : 'transparent'}
        // color={router.pathname === props.path ? props.linkColor : 'inherit'}
        color={'white'}
        onClick={() => {
          props.onClose();
        }}
      >
        {props.name}
      </Link>
    </NextLink>
  );
};

const NavNormalLink = (props: NavLinkProps) => {
  const router = useRouter();
  const link = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    color: useColorModeValue('blue.500', 'blue.200')
  };

  return (
    <Link
      href={props.path}
      px={3}
      py={1}
      lineHeight="inherit"
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: link.bg,
        // color: props.linkColor
        color: 'white'
      }}
      bg={router.pathname === props.path ? link.bg : 'transparent'}
      // color={router.pathname === props.path ? props.linkColor : 'inherit'}
      color={'white'}
      onClick={() => props.onClose()}
    >
      {props.name}
    </Link>
  );
};

interface MenuLinkProps {
  name: string;
  path: string;
  color: string;
  bg: string;
  rPath: string;
  onClose: () => void;
}

// Show Icon
const MenuLink = (props: MenuLinkProps) => {
  const iconsObj = {
    '/tech-stack': <Icon as={AiTwotoneThunderbolt} size={18} color={props.color} />,
    '/open-source': <Icon as={BsBook} size={18} color={props.color} />,
    '/achievements': <Icon as={BsCheckCircle} size={18} color={props.color} />,
    '/projects': <Icon as={MdTimeline} size={18} color={props.color} />,
    '/changelog': <Icon as={CgArrowsExchange} size={18} color={props.color} />
  };

  return (
    <NextLink href={props.path} passHref>
      <Link onClick={() => props.onClose()}>
        <MenuItem
          color={props.rPath === props.path && props.color}
          bg={props.rPath === props.path && props.bg}
          _hover={{ color: props.color, bg: props.bg }}
        >
          <HStack>
            {iconsObj[props.path]}
            <Text>{props.name}</Text>
          </HStack>
        </MenuItem>
      </Link>
    </NextLink>
  );
};

export default function TopNav() {
  const { user, SetGameState, isGameOpen } = UserAuth();
  const linkColor = useLinkColor();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const menuProps = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    color: useColorModeValue('blue.500', 'blue.200')
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      //setLoading(false);
    };

    checkAuthentication();

    if (pathname != '/game') {
      SetGameState(false);
    }
  }, [user]);

  return (
    <>
      <Box
        px={4}
        boxShadow={'lg'}
        position="fixed"
        width="100%"
        zIndex="55"
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
        }}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          w={['90%', '85%', '80%']}
          maxW={800}
          mx="auto"
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label={'Open Menu'}
            display={['inherit', 'inherit', 'none']}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <MotionBox whileHover={{ scale: 1.5 }}>
              {!isGameOpen ? (
                <NextLink href={'/'} passHref>
                  <Avatar as={Link} size={'xl'} src={'/MonteryaNoicon.png'} />
                </NextLink>
              ) : (
                <Link href={'/'}>
                  <Avatar as={Link} size={'xl'} src={'/MonteryaNoicon.png'} />
                </Link>
              )}
            </MotionBox>
            <HStack as={'nav'} spacing={3} display={{ base: 'none', md: 'flex' }}>
              {!isGameOpen ? (
                <div>
                  {startGameLink.map((link, index) => (
                    <NavNormalLink
                      key={index}
                      name={link.name}
                      path={link.path}
                      linkColor={linkColor}
                      onClose={onClose}
                    />
                  ))}

                  {webLinks.map((link, index) => (
                    <NavLink
                      key={index}
                      name={link.name}
                      path={link.path}
                      linkColor={linkColor}
                      onClose={onClose}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  {webLinks.map((link, index) => (
                    <NavNormalLink
                      key={index}
                      name={link.name}
                      path={link.path}
                      linkColor={linkColor}
                      onClose={onClose}
                    />
                  ))}
                </div>
              )}

              {/* <Menu autoSelect={false} isLazy>
                {({ isOpen, onClose }) => (
                  <>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      size="sm"
                      px={3}
                      py={1}
                      lineHeight="inherit"
                      fontSize={'1em'}
                      rounded={'md'}
                      height={'auto '}
                      _focus={{ boxShadow: 'none' }}
                      _hover={{ color: linkColor, bg: menuProps.bg }}
                      _active={{ bg: menuProps.bg }}
                    >
                      Links
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                      />
                    </MenuButton>
                    <MenuList
                      zIndex={5}
                      bg={useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)')}
                      border="none"
                      boxShadow={useColorModeValue(
                        '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
                        '2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
                      )}
                    >
                      {dropdownLinks.map((link, index) => (
                        <MenuLink
                          key={index}
                          path={link.path}
                          name={link.name}
                          onClose={onClose}
                          color={linkColor}
                          bg={menuProps.bg}
                          rPath={router.pathname}
                        />
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu> */}
            </HStack>
          </HStack>

          <HStack as={'nav'} spacing={3} display={{ base: 'none', md: 'flex' }}>
            <Flex alignItems={'center'}>
              <AccentPicker
                aria-label="Accent Color Picker"
                variant="ghost"
                zIndex={1}
                color={linkColor}
                mr={2}
              />
              <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>

            {user ? (
              <Menu autoSelect={false} isLazy>
                {({ isOpen, onClose }) => (
                  <>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      size="sm"
                      px={3}
                      py={1}
                      lineHeight="inherit"
                      fontSize={'1em'}
                      rounded={'md'}
                      height={'auto '}
                      _focus={{ boxShadow: 'none' }}
                      _hover={{ color: linkColor, bg: menuProps.bg }}
                      _active={{ bg: menuProps.bg }}
                    >
                      Profile
                      <Icon
                        as={BiChevronDown}
                        h={5}
                        w={5}
                        ml={1}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                      />
                    </MenuButton>
                    <MenuList
                      zIndex={5}
                      bg={useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)')}
                      border="none"
                      boxShadow={useColorModeValue(
                        '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
                        '2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
                      )}
                    >
                      {profiledropdownLinks.map((link, index) => (
                        <MenuLink
                          key={index}
                          path={link.path}
                          name={link.name}
                          onClose={onClose}
                          color={linkColor}
                          bg={menuProps.bg}
                          rPath={router.pathname}
                        />
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            ) : (
              signup.map((link, index) => (
                <NavLink
                  key={index}
                  name={link.name}
                  path={link.path}
                  linkColor={linkColor}
                  onClose={onClose}
                />
              ))
            )}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            w={['100%', '100%', '80%']}
            maxW={800}
            display={['inherit', 'inherit', 'none']}
          >
            <Stack as={'nav'} spacing={4}>
              {mobileLinks.map((link, index) => (
                <NavLink
                  key={index}
                  index={index}
                  name={link.name}
                  path={link.path}
                  linkColor={linkColor}
                  onClose={onClose}
                />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
