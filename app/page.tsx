// app/page.tsx
"use client";

import { Box, Text, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box
      p={4}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      color={color}
    >
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Welcome to the Home Page
      </Text>
      <Button onClick={toggleColorMode} colorScheme="teal" mb={4}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Text fontSize="lg">
        This is the main landing page of the application. Use the navigation menu to explore more.
      </Text>
    </Box>
  );
};

export default Home;

