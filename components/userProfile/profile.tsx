import { useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../configs/AuthContext';
import { fetchUser } from './profile-sever-action/profileCRUD';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDisplayName } from './profile-sever-action/profileCRUD'; // Import the function

const MotionTabs = motion(Tabs);
const MotionTabList = motion(TabList);
const MotionTabPanels = motion(TabPanels);
const MotionTabPanel = motion(TabPanel);

const schema = z.object({
  displayName: z.string().nonempty('Display Name is required')
});

const UserProfileCard = () => {
  const { user } = UserAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentuser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const toast = useToast()
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUser(user.uid);
        setCurrentUser(response);
        setLoadingUser(false);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (user && loadingUser) {
      getUser();
    }
  }, [user, loadingUser]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: ''
    }
  });

  useEffect(() => {
    if (currentuser) {
      reset({
        displayName: currentuser.displayName || ''
      });
    }
  }, [currentuser, reset]);

  const handleFormSubmit = async (values) => {
    try {
      const result = await setDisplayName(user.uid, values.displayName);
      if (result) {
        toast({
          title: `Profile Updated`,
          position: 'bottom-right',
          status: 'success',
          isClosable: true
        });
      } else {
        toast({
          title: `Profile Update Failed`,
          position: 'bottom-right',
          status: 'error',
          isClosable: true
        });
      }
      console.log('Display Name saved:', values.displayName);
    } catch (error) {
      console.error('Error saving display name:', error);
    }
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <MotionTabs
        position="relative"
        variant="unstyled"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onChange={handleTabChange}
      >
        <MotionTabList>
          <Tab _selected={{ color: 'blue.500' }}>Profile</Tab>
          <Tab _selected={{ color: 'blue.500' }}>Email</Tab>
        </MotionTabList>
        <Box mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <MotionTabPanels>
          <MotionTabPanel
            key={0}
            animate={{ opacity: selectedTab === 0 ? 1 : 0, x: selectedTab === 0 ? 0 : -50 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl isInvalid={!!errors.displayName}>
                <FormLabel>Display Name</FormLabel>
                <Input {...register('displayName')} placeholder="Enter display name" />
                <FormErrorMessage>{errors.displayName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>User ID</FormLabel>
                <Input value={currentuser?.userId || ''} placeholder="Enter user ID" readOnly />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Username</FormLabel>
                <Input value={currentuser?.username || ''} placeholder="Enter username" readOnly />
              </FormControl>

              <Button mt={4} colorScheme="blue" variant="outline" type="submit">
                Save
              </Button>
            </form>
          </MotionTabPanel>

          <MotionTabPanel
            key={1}
            animate={{ opacity: selectedTab === 1 ? 1 : 0, x: selectedTab === 1 ? 0 : -50 }}
            transition={{ duration: 0.3 }}
          >
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input value={currentuser?.email || ''} placeholder="Enter email address" readOnly />
              <FormHelperText color={currentuser?.emailVerified ? 'green.500' : 'red.500'}>
                Email verification status:{' '}
                {currentuser?.emailVerified ? 'Verified' : 'Not verified'}
              </FormHelperText>
            </FormControl>
          </MotionTabPanel>
        </MotionTabPanels>
      </MotionTabs>
    </Box>
  );
};

export default UserProfileCard;
