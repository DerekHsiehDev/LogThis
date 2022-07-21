import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/user";
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
  SimpleGrid,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useRep } from "../../../context/rep";

import { ChevronLeftIcon } from "@chakra-ui/icons";
import { MdLibraryAdd } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { useLog } from "../../../context/log";
import Router, { useRouter } from "next/router";
import StudentCard from "./StudentCard";
import LogCard from "./LogCard";

const DashboardView = ({ code, students }) => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <>
      {selectedStudent !== null ? (
        <Box w="100%" h="100%">
          <Button>
            <HStack onClick={() => setSelectedStudent(null)} my={10}>
              <ChevronLeftIcon w={50} h={50} />
              <Text fontWeight={"bold"}>Back to students list</Text>
            </HStack>
          </Button>

          <Center>
            <VStack>
              <Heading>
                {selectedStudent.firstName + " " + selectedStudent.lastName}
              </Heading>

              {selectedStudent.practice
                .slice(0)
                .reverse()
                .map((log) => (
                  <LogCard log={log} />
                ))}
            </VStack>
          </Center>
        </Box>
      ) : (
        <Box w="100%" h="100%">
          <VStack>
            <Flex align="center" justifyContent={"space-between"}>
              <Heading fontSize={"lg"}>Classroom Code: {code}</Heading>
              <Spacer />
            </Flex>
          </VStack>
          <Center>
            {students.length == 0 && (
              <Center>
                <Text mt={100} color="gray" fontWeight={"bold"} fontSize="xl">
                  No students... Add using code
                </Text>
              </Center>
            )}
            <Center mt={10}>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gap={{ base: 5, md: 10 }}
              >
                {students.map((student) => (
                  <StudentCard
                    student={student}
                    setSelectedStudent={setSelectedStudent}
                  />
                ))}
              </Grid>
            </Center>
          </Center>
        </Box>
      )}
    </>
  );
};

export default DashboardView;
