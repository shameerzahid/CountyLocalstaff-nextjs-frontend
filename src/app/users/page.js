"use client"
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, Heading, Input, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";

import Sidebar from "../components/sidebar/Sidebar";
import { useRef, useState } from "react";
import Details from "../components/Details";
import UserTable from "../components/UserTable";
import AdminAddUserForm from "../components/AdminAddUserForm"
import '../styles/styles.css'
import './user.css'
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
      <div className="usertop" style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Box margin="25px 40px 0 40px" width="calc(100% - 11vw)">
          <Heading fontSize="2.4rem" fontFamily="lato700" color="#0B393E">Users</Heading>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            p={6}
            paddingLeft={0}
            paddingRight={0}
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
                fontWeight={550}
                >
              <Text
                cursor="pointer"
                px={4}
                py={2}
                fontSize="0.8rem"
                textAlign="center"
                borderBottom={activeLink1 ? "3px solid #03AF9F" : "none"}
                height="43px"
                fontFamily="poppinsmed"
                width="110px"
                onClick={() => handleLinkClick(1)}
              >
                My Details
              </Text>
              <Text
                cursor="pointer"
                px={4}
                py={2}
                fontSize="0.8rem"
                textAlign="center"
                height="43px"
                fontFamily="poppinsmed"
                borderBottom={activeLink2 ? "3px solid #03AF9F" : "none"}
                width="76px"
                onClick={() => handleLinkClick(2)}
              >
                Users
              </Text>
              </Box>
              <Box>
              <Button fontSize="0.875rem" onClick={onOpen} borderRadius="0.2rem" bg='#03AF9F' color="white" height="36px" _hover={{ bg: '#0d7a79' }} >
                Add User</Button>
                <AdminAddUserForm  isOpen={isOpen} onClose={onClose} edit={false}                 />

                              </Box>
            </Box>
          </Flex>
          <Divider orientation='horizontal' marginTop="-26px" border="1px solid #ccc"/>
          {activeLink1 && <Details/>}
          {activeLink2 && <UserTable/>}
        </Box>
        
      </div>
      
    </>
  );
}
