import React, { useEffect, useState } from "react";
// import 'antd/dist/antd.css';
import Flatpickr from 'react-flatpickr'
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
  useToken,
} from "@chakra-ui/react";
import { useRef } from "react";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";
import flatpickr from "flatpickr";

export default function AdminAddGoalForm({ isOpen, onClose}) {

    const users = ["User 1", "User 2", "User 3"];
  const [assignAll, setAssignAll] = useState(false);
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



  const options = {
    minDate: new Date(), // Set minimum date to today
    mode: 'range',
    altInputClass: 'hide',
    dateFormat: 'M d Y',
    // wrap: true,
    maxDate: new Date('01-01-3000'),
  };

  const calendarRef = useRef(null)
    
  const openCalendar = () => {
    calendarRef.current.flatpickr.open()
  }

  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken('colors', '#F6F6F6')
 return(
    <div >
    <Drawer
size="sm"
isOpen={isOpen}
placement="right"
// initialFocusRef={firstField}
onClose={onClose}
>
  <DrawerOverlay />
  <DrawerContent style={{ borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem' }}>
    <DrawerCloseButton />
    <DrawerHeader borderBottomWidth='1px'>
      Set Goal Details
    </DrawerHeader>
    <DrawerBody className="drawercontainer">
      <Stack spacing='24px'>
        <Box>
    {/* <FormLabel htmlFor='username'>Email</FormLabel>  */}
    {/* <Button onClick={openCalendar}  bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} size="lg">
  Save
</Button> */}
<Container onClick={openCalendar} placeholder="">
<div className="datepicker-container">
<div className="datepicker-input-container">
<input
type="text"
placeholder="Please select date"
readOnly
// value={selectedDate ? selectedDate.toLocaleDateString() : ''}
/>
</div>
<Flatpickr ref={calendarRef} options={options}><input />   </Flatpickr>
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
        <Table size="md"  bg="white">
<Thead> 
<Tr backgroundColor="#03AF9F" height="8vh">
<Th style={{borderBottom:"none", padding:"0px 12px"}} fontSize="2vh" width="5vw">
<Checkbox isChecked={assignAll} onChange={handleAssignAllChange}>
  <Text fontSize="11px" width="6vw">Assign All</Text>
</Checkbox>
</Th>
<Th style={{borderBottom:"none", padding:"0px 12px"}}fontSize="2vh">Name</Th>
<Th style={{borderBottom:"none", padding:"0px"}}fontSize="2vh">
Goal No{" "}
<Input
  id="goalNumber"
  type="number"
  width="3.5vw"
  border="1px solid black"
  height="6vh"
  backgroundColor="white"
  value={goalNumber}
  onChange={handleGoalNumberChange}
  padding="0"
/>
</Th>
</Tr>
</Thead>
<Tbody>
{users.map((user, index) => (
<Tr key={index} style={{ height: "8vh",padding:0, borderRadius:"6px"}}>
<Td  backgroundColor="white"   style={{padding:"5px 30px", borderBottom: "none"}}>
  <Checkbox isChecked={checkedUsers[user]} onChange={() => handleUserCheckboxChange(user)} />
</Td>
<Td  backgroundColor="white"  style={{padding:"0 12px" , borderBottom: "none"}}>
  <Text>{user}</Text>
</Td>
<Td  backgroundColor="white"   style={{padding:"5px 30px" , borderBottom: "none"}}>
  <Input type="number" bgColor={"white"} height="6vh" padding="0" border="1px solid black" value={goalNumber} width="3.5vw" isReadOnly={assignAll} />
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
</Drawer> </div> 
 )
} 
