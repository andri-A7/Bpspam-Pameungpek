"use client";
importReact, { memo, useMemo } from"react";
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
} from"@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from"@chakra-ui/icons";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaTint,
  FaChartLine,
  FaFileAlt,
  FaDatabase,
} from"react-icons/fa";
import { IconType } from"react-icons";

typeMenuItemType =
  | { label: string; icon: IconType; href: string }
  | { label: string; icon: IconType; subItems: { label: string; href: string }[] };

typeMenuItems = {
  [key: string]: MenuItemType[];
};

interfaceSidebarProps {
  onClose: () =>void;
  isOpen: boolean;
  toggleSidebar: () =>void;
}

constSidebar: React.FC<SidebarProps> = memo(({ onClose, isOpen, toggleSidebar }) => {
  const bg = useColorModeValue("blue.800", "blue.900");
  const color = useColorModeValue("gray.100", "gray.100");
  constDividerColor = useColorModeValue("gray.100", "gray.100");
  const linkHoverColor = useColorModeValue("blue.600", "blue.700");
  const textProfile = useColorModeValue("black", "white");

  constmenuItems: MenuItems = useMemo(() => ({
    Dashboard: [{ label: "Dashboard", icon: FaTachometerAlt, href: "/admin/dashboard" }],
    Accounts: [
      {
        label: "Manajemen Akun",
        icon: FaUsers,
        subItems: [
          { label: "Petugas", href: "/admin/accounts/officer" },
          { label: "Bendahara", href: "/admin/accounts/treasurer" },
          { label: "Pengguna Air", href: "/admin/accounts/water_users" },
        ],
      },
    ],
    WaterManagement: [
      {
        label: "Manajemen Air",
        icon: FaTint,
        subItems: [
          { label: "Pembacaan Meter", href: "/admin/water_management/meter_reading" },
          { label: "Manajemen Harga", href: "/admin/water_management/tariffs" },
        ],
      },
    ],
    Billing: [{ label: "Tagihan", icon: FaFileAlt, href: "/admin/billing" }],
    Maintenance: [
      {
        label: "Pemeliharaan Sistem",
        icon: FaCog,
        subItems: [{ label: "Backup & Restore", href: "/admin/backup_restore" }],
      },
    ],
    Tasks: [{ label: "Manajemen Tugas", icon: FaDatabase, href: "/admin/tasks" }],
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
    <Flexdirection="column"justifyContent="space-between"h="full"p={4}bg={bg}color={color}><VStack align="start" spacing={4} w="full"><Box display={{ base: "none", md: "block" }} alignSelf="flex-end"><IconButton
            aria-label="Toggle Sidebar"
            icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            onClick={toggleSidebar}
            mb={4}
            _hover={{ bg: linkHoverColor }}
          />
        </Box>
        {Object.keys(menuItems).map((category) => (
          <Boxkey={category}w="full"><Text fontWeight="bold" mb={2} display={isOpen ? "block" : "none"}>
              {category}
            </Text><Divider borderColor={DividerColor} />
            {menuItems[category].map((item, index) => (
              <Boxkey={index}w="full">
                {'subItems' in item ? (
                  <AccordionallowMultiplew="full"><AccordionItem border="none"><h2><AccordionButton _hover={{ bg: linkHoverColor, borderRadius: "md" }} aria-expanded={isOpen}><Box
                            as="span"
                            flex="1"
                            textAlign={isOpen ? "left" : "center"}
                            display="flex"
                            alignItems="center"
                            justifyContent={isOpen ? "flex-start" : "center"}
                          ><Tooltip label={isOpen ? "" : item.label} aria-label={item.label}><item.icon style={{ marginRight: isOpen ? "4px" : "0" }} /></Tooltip>
                            {isOpen && item.label}
                          </Box>
                          {isOpen && <AccordionIcon />}
                        </AccordionButton></h2><AccordionPanel pb={4}>
                        {item.subItems.map((subItem) => (
                          <Linkkey={subItem.href}href={subItem.href}onClick={onClose}w="full"py={1}px={4}display="block"_hover={{bg:linkHoverColor, color: "white", borderRadius: "md" }}
                            aria-label={subItem.label}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </AccordionPanel></AccordionItem></Accordion>
                ) : (
                  <Linkhref={item.href}onClick={onClose}w="full"py={2}px={4}display="flex"alignItems="center"justifyContent={isOpen ? "flex-start" : "center"}
                    _hover={{bg:linkHoverColor, color: "white", borderRadius: "md" }}
                    aria-label={item.label}
                  ><Tooltip label={isOpen ? "" : item.label} aria-label={item.label}><item.icon style={{ marginRight: isOpen ? "4px" : "0" }} /></Tooltip>
                    {isOpen && item.label}
                  </Link>
                )}
              </Box>
            ))}
          </Box>
        ))}
      </VStack><Box
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        flexDirection="column"
        alignItems="center"
        w="full"
        p={4}
      ><Divider borderColor="gray.200" mb={4} /><Flex flexDirection="column" align="center" w="full"><Menu><MenuButton as={Flex} align="center" _hover={{ cursor: "pointer", borderRadius: "md" }}><Flex alignItems="center"><Tooltip label="User Name" aria-label="User Name Tooltip"><Avatar
                    size="sm"
                    name="User Name"
                    src="/avatar.png"
                    _hover={{ cursor: "pointer", bg: "blue.500" }}
                    mr={isOpen ? 2 : 0}
                  /></Tooltip>
                {isOpen && <TextfontWeight="bold">{`User Name`}</Text>}
              </Flex></MenuButton><MenuList bg={color} color={textProfile}><MenuGroup title="Profile"><MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  My Account
                </MenuItem><MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  Payments
                </MenuItem></MenuGroup><MenuDivider /><MenuGroup title="Help"><MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  Docs
                </MenuItem><MenuItem bg={color} color={textProfile} _hover={{ bg: linkHoverColor, borderRadius: "md" }}>
                  FAQ
                </MenuItem></MenuGroup></MenuList></Menu></Flex></Box></Flex>
  );
});

Sidebar.displayName = "Sidebar";
exportdefaultSidebar;

