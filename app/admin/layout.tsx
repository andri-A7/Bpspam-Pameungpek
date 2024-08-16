"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  CircularProgress,
  Text
} from "@chakra-ui/react";
import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const bg = useColorModeValue("blue.800", "blue.900");
  const drawerBg = useColorModeValue("blue.800", "blue.900");
  const drawerColor = useColorModeValue("black", "white");
  const progressColor = useColorModeValue("teal.500", "teal.300");
  const textColor = useColorModeValue("teal.500", "teal.300");
  const containerBg = useColorModeValue("gray.100", "gray.900");
  const backdropBg = useColorModeValue("rgba(255, 255, 255, 0.6)", "rgba(0, 0, 0, 0.6)");

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simulasi waktu loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex minH="100vh" bg={containerBg}>
      {isLoading ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100vh"
          bg={containerBg}
          position="relative"
          zIndex={9999}
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: backdropBg,
            backdropFilter: "blur(10px)",
            zIndex: -1,
          }}
        >
          <Flex direction="column" align="center">
            <CircularProgress
              isIndeterminate
              size="100px"
              color={progressColor}
              thickness="8px"
            />
            <Text
              mt={4}
              fontSize="lg"
              fontWeight="bold"
              color={textColor}
            >
              Loading...
            </Text>
          </Flex>
        </Flex>
      ) : (
        <>
          {/* Sidebar untuk tampilan desktop */}
          <Box
            w={{ base: "full", md: isSidebarOpen ? "240px" : "80px" }}
            pos="fixed"
            h="full"
            bg={bg}
            color="white"
            display={{ base: "none", md: "block" }}
            transition="width 0.01s"
            overflowY="auto"
          >
            <Sidebar
              onClose={() => {}}
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </Box>

          {/* Drawer untuk tampilan mobile */}
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent bg={drawerBg} color={drawerColor}>
                <DrawerCloseButton />
                <DrawerBody>
                  <Sidebar onClose={onClose} isOpen={true} toggleSidebar={onClose} />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>

          {/* Konten utama */}
          <Box 
            ml={{ base: 0, md: isSidebarOpen ? "240px" : "80px" }} 
            w="full"
            overflowY="auto" // Tambahkan scroll pada konten utama
            maxH="100vh" // Pastikan konten utama tidak melampaui tinggi layar
          >
            <Navbar onOpen={onOpen} />
            <Box p={4}>
              {children} {/* Konten halaman berdasarkan rute akan dimuat di sini */}
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Layout;

