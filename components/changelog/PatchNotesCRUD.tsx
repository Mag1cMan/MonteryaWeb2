import React, { useEffect, useState } from 'react';
import {
  createPatchNote,
  fetchPatchNotes,
  PatchNote
} from './patch-server-action/patchNoteService';
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  chakra,
  useDisclosure
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

const MotionBox = chakra(motion.div);

const patchNoteSchema = z
  .object({
    version: z.string().min(1, 'Version is required'),
    date: z.string().min(1, 'Date is required'),
    updateType: z
      .string()
      .min(1, 'Update type is required')
      .refine((value) => ['HotFix', 'NewFeature', 'Patching'].includes(value), {
        message: 'Invalid update type'
      }),
    NewFeatures: z.array(z.string()).optional(),
    bugFixes: z.array(z.string()).optional(),
    improvements: z.array(z.string()).optional()
  });

const PatchNoteComponent: React.FC = () => {
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);
  const [newPatchNote, setNewPatchNote] = useState<PatchNote>({
    id: "",
    version: '',
    date: '',
    updateType: '',
    NewFeatures: [],
    bugFixes: [],
    improvements: []
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isOpen, onToggle } = useDisclosure(); // Use Chakra UI's useDisclosure hook

  useEffect(() => {
    const loadPatchNotes = async () => {
      try {
        const data = await fetchPatchNotes();
        setPatchNotes(data);
      } catch (error) {
        console.error('Error loading patch notes:', error);
        // Handle error loading patch notes if needed
      }
    };
    console.log(patchNotes)
    loadPatchNotes();
  }, []);

  const validatePatchNote = (patchNote: PatchNote): boolean => {
    const result = patchNoteSchema.safeParse(patchNote);
    if (!result.success) {
      const errorObject: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path.length) {
          const fieldName = error.path[0]; // Assuming only one level deep in object
          errorObject[fieldName] = error.message;
        }
      });
      setErrors(errorObject);
      return false;
    }

    // Custom validation for at least one of NewFeatures, bugFixes, or improvements
    if (
      (!patchNote.NewFeatures.length || patchNote.NewFeatures.some((item: string) => item.trim() === '')) &&
      (!patchNote.bugFixes.length || patchNote.bugFixes.some((item: string) => item.trim() === '')) &&
      (!patchNote.improvements.length || patchNote.improvements.some((item: string) => item.trim() === ''))
    ) {
      setErrors({
        NewFeatures: 'At least one New Feature is required and cannot be empty',
        bugFixes: 'At least one Bug Fix is required and cannot be empty',
        improvements: 'At least one Improvement is required and cannot be empty'
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleCreate = async () => {
    // Validate the patch note first
    if (!validatePatchNote(newPatchNote)) return;

    try {
      await createPatchNote(newPatchNote);
      const data = await fetchPatchNotes();
      setPatchNotes(data);
      setNewPatchNote({
        id: '',
        version: '',
        date: '',
        updateType: '',
        NewFeatures: [],
        bugFixes: [],
        improvements: []
      });
      onToggle(); // Hide form after successful creation
    } catch (error) {
      console.error('Error creating patch note:', error);
      // Handle error creating patch note if needed
    }
  };


  const handleAddField = (field: string) => {
    setNewPatchNote((prev) => ({
      ...prev,
      [field]: [...(prev as PatchNote)[field], '']
    }));
  };

  const handleRemoveField = (field: string, index: number) => {
    setNewPatchNote((prev) => ({
      ...prev,
      [field]: (prev as PatchNote)[field].filter((_: PatchNote, i: number) => i !== index)
    }));
  };

  const handleFieldChange = (field: string, index: number, value: string) => {
    setNewPatchNote((prev) => ({
      ...prev,
      [field]: (prev as PatchNote)[field].map((item: string, i: number) => (i === index ? value : item))
    }));
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Patch Notes</Heading>
      <Button colorScheme="teal" onClick={onToggle} mb={5}>
        {isOpen ? 'Hide' : 'Add Patch Note'}
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <MotionBox
          key="form"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          overflow="hidden"
          transition={{  type: 'tween' }}
        >
            <VStack spacing={3} mb={5} align="stretch">
              <Flex alignItems="center" mb={3}>
                {/* Version Input */}
                <FormControl isInvalid={!!errors.version} flex="1" mr={3}>
                  <FormLabel htmlFor="version">Version</FormLabel>
                  <Input
                    id="version"
                    placeholder="Enter version"
                    value={newPatchNote.version}
                    onChange={(e) => setNewPatchNote({ ...newPatchNote, version: e.target.value })}
                    errorBorderColor="red.300"
                    variant="flushed" // Added variant for flushed style
                  />
                  {errors.version && <FormErrorMessage>{errors.version}</FormErrorMessage>}
                </FormControl>

                {/* Date Picker */}
                <FormControl isInvalid={!!errors.date} flex="1" mr={3}>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <DatePicker
                    id="date"
                    selected={newPatchNote.date ? new Date(newPatchNote.date) : null}
                    onChange={(date) =>
                      setNewPatchNote({
                        ...newPatchNote,
                        date: date ? date.toISOString().split('T')[0] : ''
                      })
                    }
                    customInput={<Input placeholder="Select Date" variant="flushed" />} // Added variant for flushed style
                    dateFormat="yyyy-MM-dd"
                    isClearable
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Select Date"
                  />
                  {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
                </FormControl>

                {/* Update Type Input */}
                <FormControl isInvalid={!!errors.updateType} flex="1">
                  <FormLabel htmlFor="updateType">Update Type</FormLabel>
                  <Select
                    id="updateType"
                    placeholder="Select update type"
                    value={newPatchNote.updateType}
                    onChange={(e) => setNewPatchNote({ ...newPatchNote, updateType: e.target.value })}
                    errorBorderColor="red.300"
                    variant="flushed" // Added variant for flushed style
                  >
                    <option value="HotFix">HotFix</option>
                    <option value="New Feature">New Feature</option>
                    <option value="Patching">Patching</option>
                    {/* Add more options as needed */}
                  </Select>
                  {errors.updateType && <FormErrorMessage>{errors.updateType}</FormErrorMessage>}
                </FormControl>
              </Flex>

              {/* New Features Section */}
              <FormControl isInvalid={!!errors.NewFeatures} mb={3}>
                <Flex alignItems="center">
                  <Heading size="sm" mr={2}>
                    New Feature
                  </Heading>
                  <IconButton
                    aria-label="Add NewFeature"
                    icon={<AddIcon />}
                    size="sm"
                    onClick={() => handleAddField('NewFeatures')}
                  />
                </Flex>
                {newPatchNote.NewFeatures.map((item, index) => (
                  <Flex key={index} alignItems="center" mb={2}>
                    <Input
                      flex="1"
                      variant="flushed"
                      value={item}
                      onChange={(e) => handleFieldChange('NewFeatures', index, e.target.value)}
                      placeholder="Enter NewFeature..."
                    />
                    <IconButton
                      aria-label="Remove"
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => handleRemoveField('NewFeatures', index)}
                      colorScheme="red"
                      ml={2}
                    />
                  </Flex>
                ))}
                {errors.NewFeatures && <FormErrorMessage>{errors.NewFeatures}</FormErrorMessage>}
              </FormControl>

              {/* Bug Fixes Section */}
              <FormControl isInvalid={!!errors.bugFixes} mb={3}>
                <Flex alignItems="center">
                  <Heading size="sm" mr={2}>
                    Bug Fixes
                  </Heading>
                  <IconButton
                    aria-label="Add Bug Fix"
                    icon={<AddIcon />}
                    size="sm"
                    onClick={() => handleAddField('bugFixes')}
                  />
                </Flex>
                {newPatchNote.bugFixes.map((item, index) => (
                  <Flex key={index} alignItems="center" mb={2}>
                    <Input
                      flex="1"
                      variant="flushed"
                      value={item}
                      onChange={(e) => handleFieldChange('bugFixes', index, e.target.value)}
                      placeholder="Enter Bug Fix..."
                    />
                    <IconButton
                      aria-label="Remove"
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => handleRemoveField('bugFixes', index)}
                      colorScheme="red"
                      ml={2}
                    />
                  </Flex>
                ))}
                {errors.bugFixes && <FormErrorMessage>{errors.bugFixes}</FormErrorMessage>}
              </FormControl>

              {/* Improvements Section */}
              <FormControl isInvalid={!!errors.improvements} mb={3}>
                <Flex alignItems="center">
                  <Heading size="sm" mr={2}>
                    Improvements
                  </Heading>
                  <IconButton
                    aria-label="Add Improvement"
                    icon={<AddIcon />}
                    size="sm"
                    onClick={() => handleAddField('improvements')}
                  />
                </Flex>
                {newPatchNote.improvements.map((item, index) => (
                  <Flex key={index} alignItems="center" mb={2}>
                    <Input
                      flex="1"
                      variant="flushed"
                      value={item}
                      onChange={(e) => handleFieldChange('improvements', index, e.target.value)}
                      placeholder="Enter Improvement..."
                    />
                    <IconButton
                      aria-label="Remove"
                      icon={<CloseIcon />}
                      size="sm"
                      onClick={() => handleRemoveField('improvements', index)}
                      colorScheme="red"
                      ml={2}
                    />
                  </Flex>
                ))}
                {errors.improvements && <FormErrorMessage>{errors.improvements}</FormErrorMessage>}
              </FormControl>

              {/* Button to Add Patch Note */}
              <Button colorScheme="blue" onClick={handleCreate} mb={3}>
                Add Patch Note
              </Button>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PatchNoteComponent;
