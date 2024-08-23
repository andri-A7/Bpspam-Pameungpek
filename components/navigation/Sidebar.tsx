"use client";
import React, { memo, useMemo } from "react";
import {
  VStack,
  Link,
  useColorModeValue,
  Box,
  IconButton,
  Avatar,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaTint,
  FaChartLine,
  FaFileAlt,
  FaDatabase,
} from "react-icons/fa";
import { IconType } from "react-icons";

type MenuItemType =
  | { label: string; icon: IconType; href: string }
  | { label: string; icon: IconType; subItems: { label: string; href: string }[] };

type MenuItems = {
  [key: string]: MenuItemType[];
};

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = memo(({ onClose, isOpen, toggleSidebar }) => {
  const bg = useColorModeValue("blue.800", "blue.900");
  const color = useColorModeValue("gray.100", "gray.100");
  const DividerColor = useColorModeValue("gray.100", "gray.100");
  const linkHoverColor = useColorModeValue("blue.600", "blue.700");
  const textProfile = useColorModeValue("black", "white");

  const menuItems: MenuItems = useMemo(() => ({
    Apps: [
      { label: "Dashboard",
         icon: FaTachometerAlt, 
         href: "/admin/dashboard" },
      {
        label: "Maintenance",
        icon: FaCog,
        subItems: [{ label: "Backup & Restore", href: "/admin/backup_restore" }],
      },

    ],
    Management: [
      {
        label: "Akun",
        icon: FaUsers,
        subItems: [
          { label: "Petugas", href: "/admin/accounts/officer" },
          { label: "Bendahara", href: "/admin/accounts/treasurer" },
          { label: "Pengguna Air", href: "/admin/accounts/water_users" },
        ],
      },
      { label: "Tagihan",
         icon: FaFileAlt,
          href: "/admin/billing" 
        },
      {
        label: "Air",
        icon: FaTint,
        subItems: [
          { label: "Pembacaan Meter", href: "/admin/water_management/meter_reading" },
          { label: "Tarif Harga", href: "/admin/water_management/tarif" },
        ],
      },
      { label: "Tugas", icon: FaDatabase, href: "/admin/tasks" },

    ],

    Reporting: [
      {
        label: "Pelaporan",
        icon: FaChartLine,
        subItems: [
          { label: "Pelaporan Petugas", href: "/admin/reporting/officer_reports" },
          { label: "Pelaporan Keuangan", href: "/admin/reporting/financial_reports" },
        ],
      },
    ],
  }), []);

  return (
    <Flex direction="column"overflowY="hidden" justifyContent="space-between" h="full" p={4} bg={bg} color={color}>
      <VStack align="start" spacing={4} w="full">
        <Box display={{ base: "none", md: "block" }} alignSelf="flex-end">
          <IconButton
            aria-label="Toggle Sidebar"
            icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            onClick={toggleSidebar}
            mb={4}
            _hover={{ bg: linkHoverColor }}
          />
        </Box>
        {Object.keys(menuItems).map((category) => (
          <Box key={category} w="full">
            <Text fontWeight="bold" mb={2} display={isOpen ? "block" : "none"}>
              {category}
            </Text>
            <Divider borderColor={DividerColor} />
            {menuItems[category].map((item, index) => (
              <Box key={index} w="full">
                {'subItems' in item ? (
                  <Accordion allowMultiple w="full">
                    <AccordionItem border="none">
                      <h2>
                        <AccordionButton _hover={{ bg: linkHoverColor, borderRadius: "md" }} aria-expanded={isOpen}>
                          <Box
                            as="span"
                            flex="1"
                            textAlign={isOpen ? "left" : "center"}
                            display="flex"
                            alignItems="center"
                            justifyContent={isOpen ? "flex-start" : "center"}
                          >
                            <Tooltip label={isOpen ? "" : item.label} aria-label={item.label}>
                              <item.icon style={{ marginRight: isOpen ? "4px" : "0" }} />
                            </Tooltip>
                            {isOpen && item.label}
                          </Box>
                          {isOpen && <AccordionIcon />}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={onClose}
                            w="full"
                            py={1}
                            px={4}
                            display="block"
                            _hover={{ bg: linkHoverColor, color: "white", borderRadius: "md" }}
                            aria-label={subItem.label}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    w="full"
                    py={2}
                    px={4}
                    display="flex"
                    alignItems="center"
                    justifyContent={isOpen ? "flex-start" : "center"}
                    _hover={{ bg: linkHoverColor, color: "white", borderRadius: "md" }}
                    aria-label={item.label}
                  >
                    <Tooltip label={isOpen ? "" : item.label} aria-label={item.label}>
                      <item.icon style={{ marginRight: isOpen ? "4px" : "0" }} />
                    </Tooltip>
                    {isOpen && item.label}
                  </Link>
                )}
              </Box>
            ))}
          </Box>
        ))}
      </VStack>

      <Box
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        flexDirection="column"
        alignItems="center"
        w="full"
        p={4}
      >
        <Divider borderColor="gray.200" mb={4} />
        <Flex flexDirection="column" align="center" w="full">
          <Menu>
            <MenuButton as={Flex} align="center" _hover={{ cursor: "pointer", borderRadius: "md" }}>
              <Flex alignItems="center">
                <Tooltip label="User Name" aria-label="User Name Tooltip">
                  <Avatar
                    size="sm"
                    name="User Name"
                    src="/avatar.png"
                    _hover={{ cursor: "pointer", bg: "blue.500" }}
                    mr={isOpen ? 2 : 0}
                  />
                </Tooltip>
                {isOpen && <Text fontWeight="bold">{`User Name`}</Text>}
              </Flex>
            </MenuButton>
            <MenuList bg={color} color={textProfile}>
              <MenuGroup title="Profile">
                <MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  My Account
                </MenuItem>
                <MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  Payments
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  Docs
                </MenuItem>
                <MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  FAQ
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Flex>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;

