import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Text,
  Flex,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserAuth } from '../../configs/AuthContext';
import { SendBugReport } from './bug-server-action/ReportHandler';

const FormSchema = z.object({
  bugType: z.string().nonempty({ message: 'Bug Type is required' }),
  bugName: z.string().nonempty({ message: 'Bug Name is required' }),
  bugDetails: z.string().nonempty({ message: 'Bug Details are required' })
});

const BugReportModal = ({ isOpen, onClose }) => {
  const { user } = UserAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bugType: '',
      bugName: '',
      bugDetails: '',
    }
  });

  const [selectedOption, setSelectedOption] = useState('');
  const [customBugType, setCustomBugType] = useState('');

  async function onSubmit (data) {
    const formData = {
      userId: user.uid, // Include user ID from context
      bugType: selectedOption === 'other' ? 'Other' : data.bugType,
      ...(selectedOption === 'other' && { customBugType: customBugType }), // Include customBugType if 'Other' is selected
      bugName: data.bugName,
      bugDetails: data.bugDetails
    };
    try {
        const result = await SendBugReport(formData);
        const { status } = JSON.parse(result);
        if (status !== 200) {
            toast({
            title: "Bug Report Failed to Send",
            description: "Try Aagin Later",
            position: 'bottom-right',
            status: "warning",
            isClosable: true,
          });
        } else {
          toast({
            title: "Bug Reported Succesfully",
            position: 'bottom-right',
            status: "success",
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "Something Went Wrong",
          position: 'bottom-right',
          status: "error",
          isClosable: true,
        });
      } finally {
        reset({
            bugType: '',
            bugName: '',
            bugDetails: ''
          });
          onClose();
      }
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBackToSelect = () => {
    setSelectedOption('');
    setCustomBugType(''); // Reset customBugType when switching back to select
  };

  const handleClose = () => {
    reset({
      bugType: '',
      bugName: '',
      bugDetails: ''
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg={'rgb(26, 32, 44)'}>
        <ModalHeader> Bug Report </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Bug Type</FormLabel>
              {selectedOption === 'other' ? (
                <Flex ml="auto" align="center">
                  <Input
                    {...register('bugType')}
                    placeholder="Describe the issue"
                    mr={2}
                    onChange={(e) => setCustomBugType(e.target.value)}
                  />
                  <Button onClick={handleBackToSelect}>Select</Button>
                </Flex>
              ) : (
                <Select
                  placeholder="Choose Bug Field"
                  size="md"
                  {...register('bugType', { required: true })}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Bug Field</option>
                  <option value="mapCollision">Map Collision</option>
                  <option value="npc">NPC</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Interaction">Interaction</option>
                  <option value="crafting">Crafting</option>
                  <option value="farm">Farm</option>
                  <option value="market">Market</option>
                  <option value="other">Other</option>
                </Select>
              )}
              {errors.bugType && selectedOption !== 'other' && (
                <Text color="red.500">{errors.bugType.message}</Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bug Name</FormLabel>
              <Input {...register('bugName')} placeholder="Bug Name" />
              {errors.bugName && <Text color="red.500">{errors.bugName.message}</Text>}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bug Details</FormLabel>
              <Textarea {...register('bugDetails')} placeholder="Further Bug Details" />
              {errors.bugDetails && <Text color="red.500">{errors.bugDetails.message}</Text>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="green" mr={3}>
              Report
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default BugReportModal;
