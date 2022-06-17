import PieceCard from "./card";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/user";
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  useDisclosure,
  IconButton,
  Flex,
  Button,
  Grid,
} from "@chakra-ui/react";
import NewPieceDrawer from "./NewPieceDrawer";
import axios from "axios";
import { useRep } from "../../../context/rep";

import { BiBookAdd } from "react-icons/bi";
import { GiConsoleController } from "react-icons/gi";

const RepView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { rep, setRep } = useRep();
  const firstField = useRef();
  // const [pieces, setPieces] = useState([]);
  const { user } = useUser();

  // get all pieces from db

  return (
    <>
      <Box w="100%" h="100%">
        <VStack>
          <Flex align="center" justifyContent={"space-between"}>
            <Heading>My Repertoire</Heading>
          </Flex>
          {rep.length == 0 && (
            <Center>
              <Text mt={100} color="gray" fontWeight={"bold"} fontSize="xl">
                Your list is so empty...
              </Text>
            </Center>
          )}
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={{ base: 5, md: 10 }}
          >
            {rep.map((piece) => (
              <PieceCard key={piece._id} piece={piece} />
            ))}
          </Grid>
        </VStack>
      </Box>
      <NewPieceDrawer
        setPieces={setRep}
        pieces={rep}
        isOpen={isOpen}
        onClose={onClose}
        firstField={firstField}
      />
      <IconButton
        m={5}
        colorScheme="red"
        p={5}
        position="fixed"
        bottom="10px"
        right="10px"
        aria-label="Add Rep"
        variant={"solid"}
        boxShadow="2xl"
        size="xl"
        fontSize="20px"
        borderRadius={"full"}
        icon={<BiBookAdd size={"30px"} />}
        onClick={onOpen}
      ></IconButton>
    </>
  );
};

export default RepView;
