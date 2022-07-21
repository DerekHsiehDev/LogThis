import { Flex, Text, Image, Link, Box, chakra } from "@chakra-ui/react";
import { stringToColor } from "../../../helpers/StringToColor";
import dateFormat from "dateformat";

const LogCard = ({ log }) => {
  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="md"
        mx="auto"
        py={4}
        px={8}
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="lg"
        rounded="lg"
      >
        <Flex
          justifyContent={{
            base: "center",
            md: "end",
          }}
          mt={-16}
        >
          <Flex
            w={20}
            h={20}
            alignItems="center"
            justifyContent={"center"}
            rounded="full"
            bg={stringToColor(log.docID)}
            // bg={stringToColor(self.crypto.randomUUID())}
            borderStyle="solid"
            borderWidth={2}
            color="white"
            _dark={{
              color: "brand.400",
            }}
          >
            <Text fontWeight={"black"} fontSize="xl">
              {dateFormat(log.date, "mm/dd")}
            </Text>
          </Flex>
        </Flex>

        <chakra.h2
          color="gray.800"
          _dark={{
            color: "white",
          }}
          my={"auto"}
          fontSize={{
            base: "2xl",
            md: "3xl",
          }}
          mt={{
            base: 2,
            md: 0,
          }}
          fontWeight="bold"
        >
          {log.minutes} Minutes
        </chakra.h2>

        <chakra.p
          mt={2}
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
        >
          {log.notes === undefined ? "No notes" : log.notes}
        </chakra.p>

        <Flex justifyContent="end" mt={4}>
          <Link
            fontSize="xl"
            color="brand.500"
            _dark={{
              color: "brand.300",
            }}
            fontWeight={"semibold"}
          >
            {log.piece}
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LogCard;
