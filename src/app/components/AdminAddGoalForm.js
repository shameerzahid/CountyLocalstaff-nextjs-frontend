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

import flatpickr from "flatpickr";
import { GoGoal } from "react-icons/go";
import '../styles/styles.css'
import Image from "next/image";
import calendersvg from '../../../public/calender.svg'
export default function AdminAddGoalForm({ isOpen, onClose}) {

    const users = ["Bob williams", "dob chef", "User 3", "dob chef"];
  const [assignAll, setAssignAll] = useState(false);
  const [goalNumber, setGoalNumber] = useState("");
  const [checkedUsers, setCheckedUsers] = useState({}); // Store the checked state of individual checkboxes

  // const handleAssignAllChange = () => {
  //   setAssignAll(!assignAll);
  //   // If "Assign All" is checked, mark all users as checked
  //   if (!assignAll) {
  //     const allCheckedUsers = {};
  //     users.forEach((user) => {
  //       allCheckedUsers[user] = true;
  //     });
  //     setCheckedUsers(allCheckedUsers);
  //   } else {
  //     setCheckedUsers({}); // If "Assign All" is unchecked, uncheck all users
  //   }
  // };

  // const handleUserCheckboxChange = (user) => {
    // Update the state for the individual checkbox
  //   setCheckedUsers((prevCheckedUsers) => ({
  //     ...prevCheckedUsers,
  //     [user]: !prevCheckedUsers[user],
  //   }));
    
  //   Check if all individual checkboxes are checked and update "Assign All" accordingly
  //   const allUsersChecked = users.every((u) => checkedUsers[u]);
  //   setAssignAll(allUsersChecked);
  // };

  // const handleGoalNumberChange = (event) => {
  //   setGoalNumber(event.target.value);
  // };



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
  const CalendarIcon = () => (
    <Image
      style={{ marginLeft: "15px" }}
      src="calender.svg"
      width={17}
      height={17}
      alt="icon"
    />
  );
 return(
    <div >
    <Drawer
 size="menu"
isOpen={isOpen}
placement="right"
// initialFocusRef={firstField}
onClose={onClose}
>
  <DrawerOverlay />
  <DrawerContent  style={{
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
            paddingTop: "1.5rem",
          }}>
    <DrawerCloseButton style={{ marginTop: "2rem" }}/>
    <DrawerHeader fontFamily="lato700" fontSize="22px">
      Set Goal Details
    </DrawerHeader>
    <DrawerBody marginBottom="3vh"className="drawercontainer">
      <Stack spacing='24px'>
        <Box>
    {/* <FormLabel htmlFor='username'>Email</FormLabel>  */}
    {/* <Button onClick={openCalendar}  bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} size="lg">
  Save
</Button> */}
<Container
                onClick={openCalendar}
                placeholder="Select Date"
                style={{ width: "fit-content" }}
                padding={0}
                margin={0}
                borderRadius= "10px"

              >
                <div
                  className="datepicker-container"
                  style={{
                    // padding: "2px",
                    position: "relative",
                    width: "27vw",
                    height: "45px",

                  }}
                >
                  <Image
                    style={{
                      marginLeft: "15px",
                      position: "absolute",
                      top: "30%",
                    }}
                    src="calender.svg"
                    width={17}
                    height={17}
                    alt="icon"
                  />
                  <Flatpickr
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    ref={calendarRef}
                    placeholder="Select date"
                    className="flatpickr"
                    options={options}
                    value={[]}
                    onChange={(dates) => console.log(dates)}
                  >
                    <div className="datepicker-container">
                      <CalendarIcon />
                    </div>
                  </Flatpickr>
                </div>{" "}
              </Container>
  </Box>
         <Box>
    <FormLabel htmlFor='username' fontFamily="poppinsmed" fontSize="14px" color="#000000" >Goal Rewards</FormLabel>
    <Input
    type="text"
    name="Email"
    placeholder="Goal Reward"
    borderRadius="10px"
    height="45px"
    _focus={{
        boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
  />
  
  </Box>
  <Box>
    <FormLabel htmlFor='username' fontFamily="poppinsmed" fontSize="14px" color="#000000">Bonus Goal</FormLabel>
    <Input
    type="number"
    name="Email"
    placeholder="Enter Number"
    borderRadius="10px"
    height="45px"
    _focus={{
        boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
  />
  
  </Box >
  <Checkbox  >
    <Text fontWeight="500" color="#494949" fontFamily="lato" fontSize="13px">Repeat</Text>
    </Checkbox>
        <Box paddingLeft={4} paddingRight={4} paddingTop={0} >
        <Table size="md"  bg="white"  >
<Thead> 
<Tr backgroundColor="#03AF9F" height="8vh">
<Th style={{borderBottom:"none", padding:"0px 12px"}} fontSize="2vh" width="33.3%">
<Checkbox>
  <Text  width="6vw" fontFamily="poppinsreg" color="#0B393E" fontSize="13px">Assign All</Text>
</Checkbox>
</Th>
<Th style={{borderBottom:"none", padding:"0px 12px"}}  width="33.3%"  fontFamily="poppinsreg" color="#0B393E" fontSize="13px">Name</Th>
<Th style={{borderBottom:"none", padding:"0px"}}  width="33.3%" fontFamily="poppinsreg" color="#0B393E" fontSize="13px">
Goal No{" "}
<Input
  id="goalNumber"
  type="number"
  width="2.5vw"
  border="1px solid #ced4da"
  height="5vh"
  backgroundColor="white"
  // value={goalNumber}
  // onChange={handleGoalNumberChange}
  padding="0"
/>
</Th>
</Tr>
</Thead>
<Tbody>
{users.map((user, index) => (
<Tr key={index} style={{ height: "8vh",padding:0, borderRadius:"6px"}}>
<Td  backgroundColor="white"  width="33.3%"   style={{padding:"5px 30px", borderBottom: "none"}}>
  <Checkbox isChecked={checkedUsers[user]} onChange={() => handleUserCheckboxChange(user)} />
</Td>
<Td  backgroundColor="white"  width="33.3%"  style={{padding:"0 12px" , borderBottom: "none"}}>
  <Text>{user}</Text>
</Td>
<Td  backgroundColor="white"  width="33.3%"   style={{padding:"5px 30px" , borderBottom: "none"}}>
  <Input type="number" bgColor={"white"} height="5vh" fontFamily="poppinsreg" padding="0" border="1px solid #ced4da" width="2.5vw" />
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
