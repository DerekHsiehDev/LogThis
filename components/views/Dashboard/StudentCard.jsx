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
import { usePage } from "../../../context/page";

export default function StudentCard({ student, setSelectedStudent }) {
  console.log(student);
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={8}
        px={10}
        textAlign={"center"}
        // px={"20"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {student.firstName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {student.lastName}
        </Text>
        {/* <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          {piece.tags.map((tag) => (
            <Badge
              key={tag}
              px={2}
              // py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              {"#" + tag}
            </Badge>
          ))}
        </Stack> */}

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.300"}
            color="white"
            onClick={() => setSelectedStudent(student)}
          >
            Practice Log
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
