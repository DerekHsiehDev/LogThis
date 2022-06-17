import React, { ReactNode, useState, useEffect } from "react";
import PracticeView from "./views/Practice/PracticeView";
import { useUser } from "../context/user";
import RepView from "./views/Rep/RepView";
import { usePage } from "../context/page";
import { RepProvider } from "../context/rep";
import { LogProvider } from "../context/log";
import ClassroomView from "./views/Classroom/ClassroomView";

import {
  useToast,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Center,
  HStack,
  VStack,
  Heading,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdClass } from "react-icons/md";
import { GiPianoKeys } from "react-icons/gi";

const LinkItems = [
  { name: "Practice", icon: GiPianoKeys },
  { name: "Repertoire", icon: IoIosMusicalNotes },
  { name: "Classroom", icon: MdClass },
];

export default function SidebarWithHeader({ children }) {
  const { page } = usePage();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dynamicPageSwitch = () => {
    switch (page) {
      case "Practice":
        return <PracticeView />;
      case "Repertoire":
        return <RepView />;
      case "Classroom":
        return <ClassroomView />;
      case "Settings":
        return <Text>Settings</Text>;
    }
  };

  return (
    <LogProvider>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <RepProvider>
          <Box ml={{ base: 0, md: 60 }} p="4">
            {dynamicPageSwitch()}
          </Box>
        </RepProvider>
      </Box>
    </LogProvider>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { setPage } = usePage();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" color="blue.500" fontWeight="bold">
          Company
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          onClick={(e) => {
            onClose();
            setPage(link.name);
          }}
          key={link.name}
          icon={link.icon}
          name={link.name}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  const { page } = usePage();
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        bg={children === page && "blue.500"}
        color={children === page && "white"}
        cursor="pointer"
        transition="0.3s ease"
        _hover={{
          bg: "blue.300",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const toast = useToast();
  const { user, setUserStateAndLocalStorage } = useUser();
  const showToast = () => {
    toast({
      title: "Signed Out",
      status: "warning",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        color="blue.500"
        fontSize="2xl"
        fontWeight="bold"
      >
        Company
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.firstName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Center my={5}>
                <Heading size="md" color="black">
                  {user.firstName + " " + user.lastName}
                </Heading>
              </Center>
              <MenuItem
                onClick={() => {
                  setUserStateAndLocalStorage(null);
                  showToast();
                }}
                color={"red.500"}
              >
                <Text fontWeight={"semibold"}>Sign Out</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
