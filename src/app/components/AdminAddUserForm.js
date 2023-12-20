"use client";
import {
  ChakraProvider,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
  extendTheme,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useRef } from "react";

export default function AdminAddUserForm({
  isOpen,
  onClose,
  name,
  username,
  email,
  role,
  edit,
  id,
}) {
  // const firstField = useRef();
  // const [newName, setNewName] = useState(name)
  // console.log(name, username, email, role)
  // console.log(newName)
  const AddUser = () => {
    console.log("User Added!");
  };
  const UpdateUser = () => {
    console.log("User Updated");
  };

  const SaveUser = () => {
    if (!id) AddUser();
    else UpdateUser();
  };

  return (
    <div>
      <Drawer
        size="menu"
        isOpen={isOpen}
        placement="right"
        // initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          style={{
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
            paddingTop: "1.5rem",
          }}
        >
          <DrawerCloseButton style={{ marginTop: "2rem" }} />
          <DrawerHeader>Add User</DrawerHeader>

          <DrawerBody marginBottom="3vh" className="drawercontainer">
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  height="50px"
                  value={name}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter First Name"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username">Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={username}
                  placeholder="Enter last Name"
                  height="50px"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username">Email</FormLabel>
                <Input
                  type="text"
                  name="Email"
                  value={email}
                  placeholder="Enter Email"
                  height="50px"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              {!edit && (
                <Box>
                  <FormLabel htmlFor="username">Password</FormLabel>
                  <Input
                    type="text"
                    name="Password"
                    placeholder="Enter Password"
                    height="50px"
                    _focus={{
                      boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                    }}
                  />
                </Box>
              )}

              <Box>
                <FormLabel htmlFor="owner">Role</FormLabel>
                <Select id="owner" defaultValue={role} height="50px">
                  <option value={0} disabled>
                    Select Role
                  </option>
                  <option value={1}>Super Admin</option>
                  <option value={2}>Admin</option>
                  <option value={3}>User</option>
                </Select>
              </Box>
              {/* <Box> */}
              <Button
                onClick={() => SaveUser()}
                bg="#03AF9F"
                color="white"
                _hover={{ bg: "#0d7a79" }}
                size="lg"
              >
                Save
              </Button>
              {/* </Box> */}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}