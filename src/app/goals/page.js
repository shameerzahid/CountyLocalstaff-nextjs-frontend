"use client"
import React, { useEffect, useState } from "react";
// import 'antd/dist/antd.css';
import Flatpickr from 'react-flatpickr'
import AdminAddGoalForm from "../components/AdminAddGoalForm"
import 'flatpickr/dist/flatpickr.css';
import {
  Box,
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import { useRef } from "react";
import { GoGoal } from "react-icons/go";
import AdminCurrentGoal from "../components/AdminCurrentgoal";
import AdminUpcomingGoal from "../components/AdminUpcomingGoal";

export default function Goals() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const firstField = useRef();

  const users = ["User 1", "User 2", "User 3"];

  const [assignAll, setAssignAll] = useState(false);
  const [endGoal, setEndGoal] = useState(true)
  const [goalNumber, setGoalNumber] = useState("");
  const [checkedUsers, setCheckedUsers] = useState({}); // Store the checked state of individual checkboxes

  const handleAssignAllChange = () => {
    setAssignAll(!assignAll);
    // If "Assign All" is checked, mark all users as checked
    if (!assignAll) {
      const allCheckedUsers = {};
      users.forEach((user) => {
        allCheckedUsers[user] = true;
      });
      setCheckedUsers(allCheckedUsers);
    } else {
      setCheckedUsers({}); // If "Assign All" is unchecked, uncheck all users
    }
  };

  const handleUserCheckboxChange = (user) => {
    // Update the state for the individual checkbox
    setCheckedUsers((prevCheckedUsers) => ({
      ...prevCheckedUsers,
      [user]: !prevCheckedUsers[user],
    }));

    // Check if all individual checkboxes are checked and update "Assign All" accordingly
    const allUsersChecked = users.every((u) => checkedUsers[u]);
    setAssignAll(allUsersChecked);
  };

  const handleGoalNumberChange = (event) => {
    setGoalNumber(event.target.value);
  };


  const [activeLink1, setActiveLink1] = useState(true);
  const [activeLink2, setActiveLink2] = useState(false);
  const handleLinkClick = (index) => {
    if (index === 1) {
      setActiveLink1(true);
      setActiveLink2(false);
    } else if (index === 2) {
      setActiveLink1(false);
      setActiveLink2(true);
    }
  };


  const options = {
    minDate: new Date(), // Set minimum date to today
    mode: 'range',
    altInputClass: 'hide',
    dateFormat: 'M d Y',
    maxDate: new Date('01-01-3000'),
  };

  const calendarRef = useRef(null)
    
  const openCalendar = () => {
    calendarRef.current.flatpickr.open()
  }
  return (
    <>
      <div style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Box margin="6vh" width="calc(100% - 11vw)">
          <Heading fontSize="4xl">Goals</Heading>
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
                  width="10vw"
                  height="45px"
                  fontSize="sm"
                  textAlign="center"
                  borderBottom={activeLink1 ? "3px solid #03AF9F" : "none"}
                  // _hover={{ borderBottom: "2px solid #4CAF50" }}
                  onClick={() => handleLinkClick(1)}
                >
                  Current Goal
                </Text>
                <Text
                  cursor="pointer"
                  px={4}
                  py={2}
                  textAlign="center"
                  height="45px"
                  fontSize="sm"
                  borderBottom={activeLink2 ? "3px solid #03AF9F" : "none"}
                  width="15vw"
                  // _hover={{ borderBottom: "2px solid #4CAF50" }}
                  onClick={() => handleLinkClick(2)}
                >
                  Upcoming Goal
                </Text>
              </Box>
              <Box>
              </Box>
            </Box>
          </Flex>
          <Divider orientation='horizontal' marginTop="-19px" border="1px solid #ccc"/>
          {/* <Tabs /> */}
          {(activeLink1 && endGoal) && <AdminCurrentGoal />}
          {activeLink2 && <AdminUpcomingGoal />}
           <Flex
            direction="column"
            align="center"
            justify="center"
            h="70vh"
          >
            <GoGoal fontSize="7em" color="#03AF9F" />
            <Heading>No Active Goal</Heading>
            <Button
              bg="#03AF9F"
              color="white"
              _hover={{ bg: "#0d7a79" }}
              size="lg"
              mt={7}
              width="20vw"
              onClick={onOpen}
            >
              Create Goal
            </Button> </Flex> 
            <AdminAddGoalForm isOpen={isOpen} onClose={onClose} />
            {/* <Drawer
            size="md"
            isOpen={isOpen}
            placement="right"
            initialFocusRef={firstField}
            onClose={onClose}
          >
              <DrawerOverlay />
              <DrawerContent style={{ borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem' }}>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                  Set Goal Details
                </DrawerHeader>
                <DrawerBody>
                  <Stack spacing='24px'>
                    <Box>
                <Button onClick={openCalendar}  bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} size="lg">
              Save
            </Button>
            <Container onClick={openCalendar} placeholder="">
            <div className="datepicker-container">
      <div className="datepicker-input-container">
        <input
          type="text"
          placeholder="Please select date"
          readOnly
        />
        <span className="calendar-icon" onClick={() => calendarRef.current.flatpickr.toggle()}>
          📅
        </span>
      </div>
      <Flatpickr ref={calendarRef} options={options} />
    </div> </Container>
              </Box>
                     <Box>
                <FormLabel htmlFor='username'>Goal Reward</FormLabel>
                <Input
                type="text"
                name="Email"
                placeholder="Goal Reward"
                height="7vh"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
              
              </Box>
              <Box>
                <FormLabel htmlFor='username'>Bonus Goal</FormLabel>
                <Input
                type="number"
                name="Email"
                placeholder="Enter Number"
                height="7vh"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
              
              </Box >
              <Checkbox >Repeat</Checkbox>
                    <Box p={4}>
                    <Table variant="simple" overflowY="auto" maxH="300px">
      <Thead>
        <Tr backgroundColor="#03AF9F">
          <Th>
            <Checkbox isChecked={assignAll} onChange={handleAssignAllChange}>
              <Text fontSize="11px">Assign All</Text>
            </Checkbox>
          </Th>
          <Th>Name</Th>
          <Th>
            Goal No{" "}
            <Input
              id="goalNumber"
              type="number"
              width="3.5vw"
              backgroundColor="white"
              value={goalNumber}
              onChange={handleGoalNumberChange}
            />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user, index) => (
          <Tr key={index}>
            <Td>
              <Checkbox isChecked={checkedUsers[user]} onChange={() => handleUserCheckboxChange(user)} />
            </Td>
            <Td>
              <Text>{user}</Text>
            </Td>
            <Td>
              <Input type="number" value={goalNumber} width="3.5vw" isReadOnly={assignAll} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
                    </Box>
                    <Button bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} size="lg">
              Save
            </Button>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>  */}
        </Box>
      </div>
    </>
  );
}