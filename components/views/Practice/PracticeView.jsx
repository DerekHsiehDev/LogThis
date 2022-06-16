import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/user";
import LogCard from "./LogCard";
import {
  Spacer,
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  useDisclosure,
  Flex,
  Button,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import NewLogDrawer from "./NewLogDrawer";

import { MdLibraryAdd } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { useLog } from "../../../context/log";

const PracticeView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { log } = useLog();
  console.log(log);

  return (
    <>
      <Box w="100%" h="100%">
        <VStack>
          <Flex align="center" justifyContent={"space-between"}>
            <Heading>Practice Log</Heading>
            <Spacer />
          </Flex>
          {log.length == 0 && (
            <Center>
              <Text mt={100} color="gray" fontWeight={"bold"} fontSize="xl">
                So empty... start practicing!
              </Text>
            </Center>
          )}
          {log
            .slice(0)
            .reverse()
            .map((log) => (
              <LogCard key={log.docID} log={log} />
            ))}
        </VStack>
      </Box>
      <NewLogDrawer isOpen={isOpen} onClose={onClose} />
      <IconButton
        m={5}
        colorScheme="blue"
        p={5}
        position="fixed"
        bottom="10px"
        right="10px"
        aria-label="Add Rep"
        variant={"solid"}
        size="xl"
        fontSize="20px"
        borderRadius={"full"}
        icon={<MdLibraryAdd size={"30px"} />}
        onClick={onOpen}
      ></IconButton>
    </>
  );
};

export default PracticeView;
