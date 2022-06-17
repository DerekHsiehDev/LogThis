import { useEffect, useState } from "react";
import {
  Flex,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Drawer,
  Spacer,
  FormLabel,
  InputLeftAddon,
  Select,
  InputRightAddon,
  Input,
  InputGroup,
  Textarea,
  DrawerFooter,
  Text,
  NumberInput,
  NumberInputField,
  Modal,
  useDisclosure,
  NumberInputStepper,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
  Stack,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { usePage } from "../../../context/page";
import axios from "axios";
import { useUser } from "../../../context/user";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { GiConsoleController } from "react-icons/gi";
import { useRep } from "../../../context/rep";
import { useLog } from "../../../context/log";

const practiceLogValues = {
  minutes: 0,
  piece: "",
  notes: "",
};

const NewLogDrawer = ({ isOpen, firstField, onClose }) => {
  const { setPage } = usePage();
  const toast = useToast();
  const [values, setValues] = useState(practiceLogValues);
  const { user } = useUser();
  const { rep } = useRep();
  const { setLog, log } = useLog();
  const countries = rep.map((rep) => rep.title);
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: OnCloseModal,
  } = useDisclosure();

  useEffect(() => {
    console.log(isOpen);
    if (rep.length === 0 && isOpen === true) {
      onOpenModal();
    }
  }, [isOpen]);

  const handleAdd = () => {
    // check if minutes is greater than 0
    if (values.minutes > 0) {
      const id = self.crypto.randomUUID();
      const date = new Date();

      const newLog = {
        ...values,
        docID: id,
        date: date,
      };
      console.log(values);

      setLog([...log, newLog]);
      setValues(practiceLogValues);
      const userID = user._id;
      console.log(values, id, userID);

      axios
        .post("/api/upload-log", { ...values, id, userID })
        .then((res) => {
          showToast(res.data.message, true);
        })
        .catch((err) => {
          console.log(err);
        });

      // save on server
      onClose();
    }
  };

  const showToast = (message, isSuccessful) => {
    toast({
      position: "top",
      title: message,
      status: isSuccessful ? "success" : "error",
      duration: 6000,
      isClosable: true,
    });
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        size={"md"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Add a new Practice Log
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="minutes">
                  How many minutes did you practice?
                </FormLabel>
                <NumberInput step={5}>
                  <NumberInputField
                    onChange={(e) => {
                      setValues({ ...values, minutes: e.target.value });
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {/* <Input
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                ref={firstField}
                id="title"
                placeholder="Please enter an amount"
              /> */}
              </Box>
              <Box>
                <FormLabel htmlFor="piece">
                  Which piece did you practice? (Optional)
                </FormLabel>
                <AutoComplete openOnFocus>
                  <AutoCompleteInput
                    id={"autocomplete"}
                    placeholder={"Search for a piece"}
                    variant="outline"
                    onBlur={(e) => {
                      var delayInMilliseconds = 500; //0.5 second

                      setTimeout(function () {
                        const piece = document.getElementById("autocomplete");
                        setValues({ ...values, piece: piece.value });
                      }, delayInMilliseconds);
                    }}

                    //   onEnded={(e) => {
                    //     console.log(e.target.value);
                    //     setValues({ ...values, piece: e.target.value });
                    //   }}
                  />
                  <AutoCompleteList>
                    {countries.map((country, cid) => (
                      <AutoCompleteItem
                        key={`option-${cid}`}
                        value={country}
                        textTransform="capitalize"
                      >
                        {country}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Notes (Optional)</FormLabel>
                <Textarea
                  onChange={(e) =>
                    setValues({ ...values, notes: e.target.value })
                  }
                  id="desc"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Flex>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Spacer />
              <Button onClick={() => handleAdd()} colorScheme="blue">
                Add
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal onClose={OnCloseModal} isOpen={isOpenModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>No Pieces in Repertoire List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Would You like to add a piece to your repertoire first?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setPage("Repertoire")}
            >
              Yes
            </Button>
            <Button colorScheme="red" onClick={OnCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewLogDrawer;
