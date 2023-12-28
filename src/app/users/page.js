"use client";
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
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import { useRef, useState } from "react";
import Details from "../components/Details";
import UserTable from "../components/UserTable";
import AdminAddUserForm from "../components/AdminAddUserForm";
import "../styles/styles.css";
import "./user.css";
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
  const Drawer = {
    sizes: {
      menu: {
        dialog: { maxWidth: "31%" },
      },
    },
  };
  const customTheme = extendTheme({
    components: {
      Drawer,
    },
  });
  return (
    <>
      <div
        className="usertop"
        style={{
          backgroundColor: "#F4F9F6",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar />
        <Box className="md:mx-10 mt-6 mx-5" width="calc(100% - 11vw)">
          <Heading fontSize="2.4rem" fontFamily="lato700" color="#0B393E">
            Users
          </Heading>
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
              display={{ base: "flex", md: "flex" }}
              width="70vw"
              justifyContent="space-between"
              // width={{ base: "full", md: "auto" }}
              alignItems="center"
              flexGrow={1}
            >
              <Box
                display={{ base: "flex", md: "flex" }}
                width={{ base: "auto", md: "auto" }}
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
                  zIndex={activeLink1 ? 999 : "auto"}
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
                  zIndex={activeLink2 ? 999 : "auto"}
                >
                  Users
                </Text>
              </Box>
              <Box>
                <Button
                  fontSize="0.875rem"
                  onClick={onOpen}
                  borderRadius="0.2rem"
                  bg="#03AF9F"
                  color="white"
                  height="36px"
                  _hover={{ bg: "#0D7A79" }}
                >
                  Add User
                </Button>
                <ChakraProvider theme={customTheme}>
                  <AdminAddUserForm
                    isOpen={isOpen}
                    onClose={onClose}
                    edit={false}
                  />
                </ChakraProvider>
              </Box>
            </Box>
          </Flex>
          <Divider
            orientation="horizontal"
            marginTop="-24px"
            border="1px solid #ccc"
          />
          {activeLink1 && <Details />}
          {activeLink2 && <UserTable />}
        </Box>
      </div>
    </>
  );
}