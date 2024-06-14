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
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { AiTwotoneThunderbolt } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { CgAttribution, CgDebug, CgLogOut, CgNotes, CgProfile, CgStack } from 'react-icons/cg';
import { MdTimeline } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useLinkColor } from 'components/theme';
import { MotionBox } from 'components/shared/animations/motion';
import { UserAuth } from '../../configs/AuthContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { CiMoneyBill } from 'react-icons/ci';
import BugReportModal from 'components/BugReport/BugReport';

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
  { name: 'PatchNotes', path: '/changelog' },
  { name: 'RoadMap', path: '/achievements' },
  // { name: 'Blog', path: '/blog' }
  // { name: 'Projects', path: '/projects' },
  // { name: 'Tech Stack', path: '/tech-stack' },
  // { name: 'Open Source', path: '/open-source' },
  // { name: 'Achievements', path: '/achievements' },
  // { name: "Developer Story", path: "/developer-story" }
];

const profiledropdownLinks = [
  { name: 'UserProfile', path: '/userprofile' },
  { name: 'Transaction', path: '/transaction' },
  { name: 'BugReports', path: '/bugReports' },
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
const MenuLink = (props: MenuLinkProps & { isOpen: boolean }) => {
  const iconsObj = {
    '/tech-stack': <Icon as={AiTwotoneThunderbolt} size={18} color={props.color} />,
    '/open-source': <Icon as={BsBook} size={18} color={props.color} />,
    '/achievements': <Icon as={CgAttribution} size={18} color={props.color} />,
    '/projects': <Icon as={MdTimeline} size={18} color={props.color} />,
    '/changelog': <Icon as={CgStack} size={18} color={props.color} />,
    '/blog': <Icon as={CgNotes} size={18} color={props.color} />,
    '/logout': <Icon as={CgLogOut} size={18} color={props.color} />,
    '/userprofile': <Icon as={CgProfile} size={18} color={props.color} />,
    '/transaction': <Icon as={CiMoneyBill} size={18} color={props.color} />,
    '/bugReports': <Icon as={CgDebug} size={18} color={props.color} />
  };

  return !props.isOpen ? (
    <NextLink href={props.path} passHref>
      <Link onClick={() => props.onClose()}>
        <MenuItem
          color={'white'}
          bg={props.rPath === props.path && props.bg}
          _hover={{ color: 'white', bg: props.bg }}
        >
          <HStack>
            {iconsObj[props.path]}
            <Text>{props.name}</Text>
          </HStack>
        </MenuItem>
      </Link>
    </NextLink>
  ) : (
    <Link href={props.path}>
      <MenuItem
        color={'white'}
        bg={props.rPath === props.path && props.bg}
        _hover={{ color: 'white', bg: props.bg }}
        onClick={() => props.onClose()}
      >
        <HStack>
          {iconsObj[props.path]}
          <Text>{props.name}</Text>
        </HStack>
      </MenuItem>
    </Link>
  );
};

export default function TopNav() {
  const { user, SetGameState, isGameOpen } = UserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkColor = useLinkColor();
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerBugOpen, setIsDrawerBugOpen] = useState(false);

  // console.log(user);

  const onDrawerBugOpen = () => {
    setIsDrawerBugOpen(true);
  };

  const onDrawerBugClose = () => {
    setIsDrawerBugOpen(false);
  };

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
          backgroundColor: 'rgba(26, 32, 44, 0.8)'
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
                  <Avatar size={'xl'} src={'/MonteryaNoicon.png'} />
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
                </div>
              ) : null}

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
                      color={'white'}
                      _focus={{ boxShadow: 'none' }}
                      _hover={{ color: 'white', bg: menuProps.bg }}
                      _active={{ color: 'white', bg: menuProps.bg }}
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
                      bg={'rgb(26, 32, 44)'}
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
                          isOpen={isGameOpen} // Pass the isOpen prop here
                        />
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            </HStack>
          </HStack>

          <HStack as={'nav'} spacing={3} display={{ base: 'none', md: 'flex' }}>
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
                      _hover={{ color: 'white', bg: menuProps.bg }}
                      _active={{ color: 'white', bg: menuProps.bg }}
                      color={'white'}
                    >
                      {!user.displayName ? ("Profile") : (user.displayName)}
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
                      bg={'rgb(26, 32, 44)'}
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
                          isOpen={isGameOpen}
                        />
                      ))}
                    </MenuList>
                    <Tooltip label="Bug Report" aria-label="Bug Report">
                      <IconButton
                        bg={'rgb(26, 32, 44)'}
                        _hover={{ color: 'black', bg: 'rgb(26, 32, 44)' }}
                        onClick={onDrawerBugOpen}
                        aria-label="Bug Report"
                        icon={<Icon as={CgDebug} color="red" boxSize={6} />}
                      />
                    </Tooltip>
                    <BugReportModal isOpen={isDrawerBugOpen} onClose={onDrawerBugClose} />
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
