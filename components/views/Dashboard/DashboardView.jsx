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
  Grid,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useRep } from "../../../context/rep";

import { MdLibraryAdd } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { useLog } from "../../../context/log";

const DashboardView = () => {
  const { user } = useUser();

  const [code, useCode] = useState("");

  const getClassroomStatus = () => {
    if (user) {
      axios
        .post("/api/create-classroom", {
          ownerID: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .then((res) => {
          console.log(res.data.message);
          console.log(res.data.classroom);
          useCode(res.data.classroom._id);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          // already owns
          console.log(err.response.data.code);
          useCode(err.response.data.code._id);
        });
    } else {
      console.log("UNDefined");

      setTimeout(function () {
        console.log(user);
        getClassroomStatus();
      }, 5000);
    }
  };

  useEffect(() => {
    // run api

    getClassroomStatus();
  }, []);

  return (
    <>
      <Box w="100%" h="100%">
        <VStack>
          <Flex align="center" justifyContent={"space-between"}>
            <Heading fontSize={"lg"}>Classroom Code: {code}</Heading>
            <Spacer />
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default DashboardView;
