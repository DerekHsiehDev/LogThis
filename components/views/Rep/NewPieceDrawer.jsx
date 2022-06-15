import { useState } from "react";
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
  Container,
  Stack,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { EmailChipInput } from "./ChipInput";
import axios from "axios";
import { useUser } from "../../../context/user";
import { GiConsoleController } from "react-icons/gi";

const initalValues = {
  title: "",
  composer: "",
  tags: [],
  notes: "",
};

const NewPieceDrawer = ({ isOpen, firstField, onClose, setPieces, pieces }) => {
  const toast = useToast();
  const [values, setValues] = useState(initalValues);
  const { user } = useUser();
  const showToast = (message, isSuccessful) => {
    toast({
      title: message,
      status: isSuccessful ? "success" : "error",
      duration: 6000,
      isClosable: true,
    });
  };

  const uploadNewPiece = () => {
    axios
      .post("/api/upload-rep", {
        title: values.title,
        userID: user._id,
        composer: values.composer,
        tags: values.tags,
        notes: values.notes,
      })
      .then((res) => {
        onClose();
        showToast(res.data.message, true);
      });
    const newPiece = {
      title: values.title,
      userID: user._id,
      composer: values.composer,
      tags: values.tags,
      notes: values.notes,
    };
    setPieces([...pieces, newPiece]);
  };

  const setTags = (tags) => {
    setValues({ ...values, tags: tags });
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Add New Piece or Song
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                ref={firstField}
                id="title"
                placeholder="Please enter a title"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="composer">Composer</FormLabel>
              <Input
                onChange={(e) =>
                  setValues({ ...values, composer: e.target.value })
                }
                id="composer"
                placeholder="Please enter a composer"
              />
            </Box>

            <Box>
              <Text>Tags separated by commas or enter (#classical).</Text>

              <EmailChipInput setTags={setTags} values={values} />
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
            <Button onClick={() => uploadNewPiece()} colorScheme="blue">
              Add
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewPieceDrawer;
