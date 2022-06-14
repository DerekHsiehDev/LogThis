import PieceCard from "./card";
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  Spacer,
  Flex,
  Button,
  Grid,
} from "@chakra-ui/react";
import { MdLibraryAdd } from "react-icons/md";

const RepView = () => {
  return (
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
          >
            Add
          </Button>
        </Flex>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={{ base: 5, md: 10 }}
        >
          <PieceCard />
          <PieceCard />
          <PieceCard />
          <PieceCard />
        </Grid>
      </VStack>
    </Box>
  );
};

export default RepView;
