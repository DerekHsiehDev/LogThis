import PieceCard from "./card";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/user";
import {
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
} from "@chakra-ui/react";
import NewPieceDrawer from "./NewPieceDrawer";
import axios from "axios";

import { MdLibraryAdd } from "react-icons/md";

const RepView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const [pieces, setPieces] = useState([]);
  const { user } = useUser();

  // get all pieces from db
  useEffect(() => {
    axios
      .post("/api/get-rep", { userID: user._id })
      .then((res) => {
        let json = [];
        for (let index = 0; index < res.data.message.length; index++) {
          json.push(res.data.message[index]);
        }
        setPieces(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(pieces);

  return (
    <>
      <Box w="100%" h="100%">
        <VStack>
          <Flex align="center" justifyContent={"space-between"}>
            <Heading>My Repertoire</Heading>

            <Button
              m={5}
              colorScheme="blue"
              aria-label="Add Rep"
              variant={"ghost"}
              size="xl"
              fontSize="20px"
              leftIcon={<MdLibraryAdd size={"30px"} />}
              onClick={onOpen}
            >
              Add
            </Button>
          </Flex>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={{ base: 5, md: 10 }}
          >
            {pieces.map((piece) => (
              <PieceCard piece={piece} key={piece._id} />
            ))}
          </Grid>
        </VStack>
      </Box>
      <NewPieceDrawer
        setPieces={setPieces}
        pieces={pieces}
        isOpen={isOpen}
        onClose={onClose}
        firstField={firstField}
      />
    </>
  );
};

export default RepView;
