import {
  Stack,
  IconButton,
  Box,
  Text,
  Flex
} from "@chakra-ui/react";
import siteConfig from "../../configs/site-config";

const iconProps = {
  variant: "ghost",
  size: "lg",
  isRound: true
};

const Footer = () => {
  return (
    <Stack
      as="footer"
      isInline
      spacing={[1, 2]}
      p={4}
      justifyContent="space-between"
      alignItems="center"
      w={["100%", "85%", "80%"]}
      maxW={800}
      mx="auto"
    >
      <Flex
        flexDirection={["column", "column", "row"]}
        flexFlow={["column-reverse", "column-reverse"]}
        justifyContent={["center", "space-between"]}
        alignItems="center"
        w="100%"
      >
        <Text
          textAlign="center"
          fontSize="sm"
          color="gray.200"
        >
          © {new Date().getFullYear()} Monterya{" "}
        </Text>
        <Box textAlign="center">
          {siteConfig.author.accounts.map((sc, index) => (
            <IconButton
              key={index}
              as="a" // Change to "a" instead of using Link component
              href={sc.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sc.label}
              size="lg"
              color={"white"}
              icon={sc.icon}
              {...iconProps}
            />
          ))}
        </Box>
      </Flex>
    </Stack>
  );
};

export default Footer;
