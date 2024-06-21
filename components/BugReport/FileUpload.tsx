import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa'; // Import an icon for the button (optional)

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onReset: () => void; // Add onReset prop
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onReset }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for image preview
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      handleFileUpload(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const { items } = e.clipboardData;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          handleFileUpload(file);
          break;
        }
      }
    }
  };

  const handleFileUpload = (file: File) => {
    onFileSelect(file);

    // Read and display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Reset function to clear selected file and image preview
  const resetFileUpload = () => {
    setSelectedImage(null);
    onReset(); // Call parent component's reset function to clear selected file
  };

  return (
    <Box
      p={6}
      borderWidth={2}
      borderColor={dragging ? 'blue.400' : 'gray.200'}
      borderStyle="dashed"
      borderRadius="md"
      textAlign="center"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste} // Handle paste events
      cursor="pointer"
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <Flex direction="column" alignItems="center" justifyContent="center">
        {selectedImage ? (
          <>
            <img src={selectedImage} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '1rem' }} />
            <Button onClick={resetFileUpload}>Clear Image</Button>
          </>
        ) : (
          <Button
            leftIcon={<FaFileUpload />}
            colorScheme="blue"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            mb={3}
          >
            Select File
          </Button>
        )}
        <Text fontSize="sm" color="gray.500">
          {selectedImage ? 'Drag and drop or paste another image to replace' : 'Drag and drop your file here, or click to select a file or paste an image.'}
        </Text>
      </Flex>
    </Box>
  );
};

export default FileUpload;
