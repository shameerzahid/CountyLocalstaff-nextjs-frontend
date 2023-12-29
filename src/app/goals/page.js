"use client"
import React, { useEffect, useState } from "react";
// import 'antd/dist/antd.css';
import Flatpickr from 'react-flatpickr'
import AdminAddGoalForm from "../components/AdminAddGoalForm"
import 'flatpickr/dist/flatpickr.css';
import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  extendTheme,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import AdminCurrentGoal from "../components/AdminCurrentgoal";
import '../styles/styles.css'
import AdminUpcomingGoal from "../components/AdminUpcomingGoal";
import NoGoal from '../components/NoGoal'
import GoalEndPoint from '../constants/goalurls'
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
export default function Goals() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeLink1, setActiveLink1] = useState(true);
  const [activeLink2, setActiveLink2] = useState(false);
  const [goals, setGoals] = useState([])
  const token = useSelector(selectToken);
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
        dialog: { maxWidth: "31%" }
      }
    }
  };

  const customTheme = extendTheme({
    components: {
      Drawer
    }
  });


  useEffect(() => {
    const getAllGoals = async () => {
      try {

        const data = await fetch(`${GoalEndPoint}/active-goals`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const Goals = await data.json()
          setGoals(Goals)
         
      } catch (error) {
        console.log(error)
      }
    }
    getAllGoals()

  }, [])
  return (
    <>
      <div style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Box margin="25px 40px 20px 40px" width="calc(100% - 11vw)">
          <Heading fontSize="2.4rem" fontFamily="lato700" color="#0B393E">Goal</Heading>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            p={4}
            paddingLeft={0}
            paddingRight={0}
          >
            <Box
              display={{ base: "block", md: "flex" }}
              width="70vw"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
            >
              <Box
                display={{ base: "block", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                fontWeight={550}
                flexGrow={1}
              >
                <Text
                  cursor="pointer"
                  px={4}
                  py={2}
                  width="150px"
                  height="38px"
                  fontSize="0.8rem"
                  fontFamily="poppinsmed"
                  color="#0b393e"
                  textAlign="center"
                  borderBottom={activeLink1 ? "3px solid #03AF9F" : "none"}
                  // _hover={{ borderBottom: "2px solid #4CAF50" }}
                  onClick={() => handleLinkClick(1)}
                  zIndex={activeLink1 ? 999 : "auto"}

                >
                  Current Goal
                </Text>
                <Text
                  cursor="pointer"
                  px={4}
                  py={2}
                  textAlign="center"
                  height="38px"
                  fontSize="0.8rem"
                  color="#0b393e"
                  fontFamily="poppinsmed"
                  borderBottom={activeLink2 ? "3px solid #03AF9F" : "none"}
                  width="150px"
                  // _hover={{ borderBottom: "2px solid #4CAF50" }}
                  onClick={() => handleLinkClick(2)}
                  zIndex={activeLink2 ? 999 : "auto"}

                >
                  Upcoming Goal
                </Text>
              </Box>
              <Box>
              </Box>
            </Box>
          </Flex>
          <Divider orientation='horizontal' marginTop="-16px" border="1px solid #ccc" />
          {/* <Tabs /> */}
          
    {activeLink1 && <AdminCurrentGoal/>}
          {activeLink2 && <AdminUpcomingGoal/>}





          <ChakraProvider theme={customTheme}>

            <AdminAddGoalForm isOpen={isOpen} onClose={onClose} />
          </ChakraProvider>
        </Box>
      </div>
    </>
  );
}