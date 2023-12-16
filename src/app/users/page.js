"use client"
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, Heading, Input, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";

import Sidebar from "../components/sidebar/Sidebar";
import { useRef, useState } from "react";
import Details from "../components/Details";
import UserTable from "../components/UserTable";
import AdminAddUserForm from "../components/AdminAddUserForm"

export default function Users() {
  const [activeLink1, setActiveLink1] = useState(true);
  const [activeLink2, setActiveLink2] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const initialFocusRef = useRef();


  const handleLinkClick = (index) => {
    if (index === 1) {
      setActiveLink1(true);
      setActiveLink2(false);
    } else if (index === 2) {
      setActiveLink1(false);
      setActiveLink2(true);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Box margin="6vh" width="calc(100% - 11vw)">
          <Heading fontSize="4xl">Users</Heading>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            p={4}
          >
            <Box
                display={{ base: "block", md: "flex" }}
                width="70vw"
                justifyContent="space-between"
                // width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
            >
                <Box
                display={{ base: "block", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                >
              <Text
                cursor="pointer"
                px={4}
                py={2}
                fontSize="sm"
                textAlign="center"
                borderBottom={activeLink1 ? "3px solid #03AF9F" : "none"}
                height="7vh"
                width="10vw"
                onClick={() => handleLinkClick(1)}
              >
                My Details
              </Text>
              <Text
                cursor="pointer"
                px={4}
                py={2}
                fontSize="sm"
                textAlign="center"
                height="7vh"
                borderBottom={activeLink2 ? "3px solid #03AF9F" : "none"}
                width="10vw"
                onClick={() => handleLinkClick(2)}
              >
                Users
              </Text>
              </Box>
              <Box>
              <Button fontSize="2.5vh" onClick={onOpen} bg='#03AF9F' color="white" width="7vw" height="6vh" _hover={{ bg: '#0d7a79' }} size="lg" >
                Add User</Button>
                <AdminAddUserForm  isOpen={isOpen} onClose={onClose} edit={false}
                //  initialFocusRef={initialFocusRef} 
                 />
      {/* <Drawer size="md"
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent style={{ borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem'}}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Add User
          </DrawerHeader>

          <DrawerBody marginTop="5vh">
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>First Name</FormLabel>
                <Input
                type="text"
                name="firstName"
                height="7vh"
                placeholder="Enter First Name"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              /></Box>
                <Box>
                <FormLabel htmlFor='username'>Last Name</FormLabel>
                <Input
                type="text"
                name="lastName"
                placeholder="Enter last Name"
                height="7vh"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
              
              </Box>
              <Box>
                <FormLabel htmlFor='username'>Email</FormLabel>
                <Input
                type="text"
                name="Email"
                placeholder="Enter Email"
                height="7vh"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
              
              </Box>
              <Box>
                <FormLabel htmlFor='username'>Password</FormLabel>
                <Input
                type="text"
                name="Password"
                placeholder="Enter Password"
                height="7vh"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
              
              </Box>
              <Box>
                <FormLabel htmlFor='owner'>Role</FormLabel>
                <Select id='owner' defaultValue='segun' height="7vh">
                  <option value='segun'>Super Admin</option>
                  <option value='kola'>Admin</option>
                  <option value='kola'>User</option>
                </Select>
              </Box>
              
              <Button bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} size="lg">
              Save
            </Button>
              
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
 */}

                              </Box>
            </Box>
          </Flex>
          <Divider orientation='horizontal' marginTop="-3vh" border="1px solid #ccc"/>
          {activeLink1 && <Details/>}
          {activeLink2 && <UserTable/>}
        </Box>
        
      </div>
      
    </>
  );
}
