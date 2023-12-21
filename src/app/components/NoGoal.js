"use client"
import { Button, ChakraProvider, Flex, Heading,  extendTheme,  useDisclosure } from "@chakra-ui/react";
import { GoGoal } from "react-icons/go";
import 'flatpickr/dist/flatpickr.css';
import AdminAddGoalForm from "./AdminAddGoalForm";
import { useRef, useState } from "react";
export default function NoGoal ({title}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const users = ["User 1", "User 2", "User 3"];

  const [assignAll, setAssignAll] = useState(false);
  // const [endGoal, setEndGoal] = useState(false)
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
    maxDate: new Date('01-01-3000'),
  };

  const calendarRef = useRef(null)
    
  const openCalendar = () => {
    calendarRef.current.flatpickr.open()
  }
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

    return (
        <Flex
        direction="column"
        align="center"
        justify="center"
        h="70vh"
      >
        <GoGoal fontSize="7em" color="#03AF9F" />
        <Heading>{title}</Heading>
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
        </Button>
        <ChakraProvider theme={customTheme}>

<AdminAddGoalForm isOpen={isOpen} onClose={onClose} />
</ChakraProvider>
         </Flex>  
        
    )
}