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
  List,
  ListItem,
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
  const optionnns = [
    "Super Admin",
    "Admin",
    "User",
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpenn, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(name)
  const [lastName, setLastName] = useState(username)
  const [newemail, setNewEmail] = useState(email)
  const [password, setPassword] = useState("")
  const [newrole, setNewRole] = ("")


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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
                  value={firstName}
                  onChange = {(e) => setFirstName(e.target.value) }
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
                  value={lastName}
                  onChange = {(e) => setLastName(e.target.value) }
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
                  value={newemail}
                  onChange = {(e) => setNewEmail(e.target.value) }
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
                    value={password}
                    onChange = {(e) => setPassword(e.target.value) }
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
                {/* <Select
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
                </Select> */}
                <Box
                position="relative"
              >
                <Text
                  onClick={() => setIsOpen(!isOpenn)}
                  cursor="pointer"
                  fontFamily="poppinsreg"
                  // padding={2}
                  placeholder="Select User Type"
                  className="text-selected"
                  style={{
                    border: "1px solid #979797",
                    height:"50px",
                    display: "flex",
                    paddingLeft:"16px",
                    fontFamily:"poppinsmed",
                    justifyContent: "start",
                    alignItems: "center",
                    width:"full",
                    flexDirection: "row",
                  }}
                  borderRadius="10px"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                >
                  {selectedOption ? (
                    <>
                     <span>{selectedOption}</span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span
                        style={{
                          color: "#718096",
                          fontSize: "16px",
                          fontFamily:"poppinsreg",
                          fontWeight: "400",
                          marginTop: "2px",
                          marginRight: "8px",
                        }}
                      >
                        Select an option
                      </span>{" "}
                    </>
                  )}
                </Text>
                {isOpenn && (
                  <List
                    position="absolute"
                    top="100%"
                    left={0}
                    mt={0.5}
                    zIndex={1}
                    width="100%"
                    style={{ border: "1px solid #ccc", padding: "0.5rem 0" }}
                    borderRadius="md"
                    backgroundColor="white"
                  >
                    {optionnns.map((option) => (
                      <ListItem
                        key={option}
                        style={{
                          padding: "0.25rem 1.5rem",
                          fontFamily: "poppins",
                          fontSize: "0.9rem",
                          color: "#16181B",
                        }}
                        _hover={{ backgroundColor: "#039E90" }}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
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