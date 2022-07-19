import React, { ReactNode, useState, useEffect } from "react";
import { useUser } from "../context/user";
import { useRouter } from "next/router";
import DashboardView from "../components/views/Dashboard/DashboardView";

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

const LinkItems = [{ name: "Go Home", icon: GiPianoKeys }];

export default function Dashboard({ children }) {
  const { user, getUserFromLocalStorage } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   if (user === null) {
  //     getUserFromLocalStorage();
  //   }
  // }, []);

  return (
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
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Box mt={{ base: "100", md: "0" }}>
          <DashboardView />
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "60" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" color="blue.700" fontWeight="bold">
          Teacher Dashboard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          onClick={(e) => {
            onClose();
            router.push("/");
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
        bg={"blue.700"}
        color={"white"}
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
      // as="header"
      // position="fixed"
      zIndex={1}
      // // w={{ base: "full", lg: "%" }}
      // w={"full"}
      // ml={{ base: 0, md: 60 }}
      // px={{ base: 4, md: 4 }}
      // height="20"
      // alignItems="center"
      // bg={useColorModeValue("white", "gray.900")}
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      // justifyContent={{ base: "space-between", md: "flex-end" }}
      // {...rest}

      ml={{ base: 0, md: 60 }}
      position={{ base: "fixed", md: "static" }}
      minW={{ base: "full", md: "0" }}
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
        color="blue.700"
        fontSize="lg"
        fontWeight="bold"
      >
        Teacher Dashboard
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
                  <Text fontSize="sm">{user?.firstName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
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
                  {user?.firstName + " " + user?.lastName}
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
