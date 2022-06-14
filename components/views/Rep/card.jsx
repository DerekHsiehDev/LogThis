import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PieceCard() {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={8}
        textAlign={"center"}
        px={20}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Ballade No. 4
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          Frederic Chopin
        </Text>
        <Heading fontSize={"xl"} fontFamily={"body"} color="purple.300">
          40 hours
        </Heading>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Romantic
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Etude
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"green.300"}
            color="white"
          >
            Add Hours
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
