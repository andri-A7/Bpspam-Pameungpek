import React, { memo } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, BellIcon, SearchIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

interface NavbarProps {
  onOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = memo(({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("blue.800", "blue.900");
  const color = useColorModeValue("gray.100", "gray.100");

  return (
    <Flex
      h={16}
      alignItems="center"
      justifyContent="space-between"
      px={4}
      bg={bg}
      color={color}
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
      transition="background-color 0.3s ease-in-out"
      overflow="hidden"  // Ensure no overflow
      wrap="wrap"        // Allow wrapping of Flex items
    >
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        _hover={{ bg: "blue.500" }}
      />
      <Box p={6} fontWeight="bold" fontSize="xl" overflow="hidden" flexShrink={0}>
        BPSPAM Dashboard
      </Box>
      <InputGroup display={{ base: "none", md: "flex" }} w={{ base: "full", md: "60%" }} maxW="600px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="search" placeholder="Search..." />
      </InputGroup>
      <Flex alignItems="center" ml={2} overflow="hidden" wrap="wrap" flexShrink={0}>
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          m={2}
          _hover={{ bg: "blue.500" }}
        />
        <Button
          alignItems="center"
          onClick={toggleColorMode}
          m={2}
          _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
          borderRadius="full"
          _focus={{ boxShadow: "none" }}
          transition="background-color 0.3s ease"
          p={3}  // Adjust padding to ensure button fits
          minW="auto" // Adjust width to fit content
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;

