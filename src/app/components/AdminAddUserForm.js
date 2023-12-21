"use client";
import React, { useState } from "react";
import {
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../styles/styles.css";
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
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const style = {
    background: isHovered ? "green " : "yellow",
    // Add other styles as needed
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
          <DrawerHeader fontFamily="lato700" fontSize="1.4rem">
            Add User
          </DrawerHeader>
          <DrawerBody marginBottom="3vh" className="drawercontainer">
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username" fontFamily="poppinsreg">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  height="50px"
                  style={{ border: "1px solid #979797", borderRadius: "10px" }}
                  fontFamily="poppinsreg"
                  value={name}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter First Name"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username" fontFamily="poppinsreg">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={username}
                  fontFamily="poppinsreg"
                  placeholder="Enter last Name"
                  style={{ border: "1px solid #979797", borderRadius: "10px" }}
                  height="50px"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username" fontFamily="poppinsreg">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  name="Email"
                  value={email}
                  fontFamily="poppinsreg"
                  placeholder="Enter Email"
                  height="50px"
                  style={{ border: "1px solid #979797", borderRadius: "10px" }}
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              {!edit && (
                <Box>
                  <FormLabel htmlFor="username" fontFamily="poppinsreg">
                    Password
                  </FormLabel>
                  <Input
                    type="text"
                    name="Password"
                    placeholder="Enter Password"
                    fontFamily="poppinsreg"
                    height="50px"
                    style={{
                      border: "1px solid #979797",
                      borderRadius: "10px",
                    }}
                    _focus={{
                      boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                    }}
                  />
                </Box>
              )}
              <Box>
                <FormLabel htmlFor="owner" fontFamily="poppinsreg">
                  Role
                </FormLabel>
                <Select
                  id="owner"
                  defaultValue={role}
                  appearance={"none"}
                  fontFamily="poppinsreg"
                  style={{
                    border: "1px solid #979797",
                    borderRadius: "10px",
                  }}
                  height="50px"
                  focusBorderColor="#0D7A79" // Set the desired color for the border on focus
                  focusBorderWidth="2px" // Set the desired border width on focus
                >
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
                _hover={{ bg: "#0D7A79" }}
                size="lg"
              >
                Save
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}