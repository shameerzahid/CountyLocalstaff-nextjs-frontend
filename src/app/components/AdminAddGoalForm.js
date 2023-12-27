import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
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
  useToken,
} from "@chakra-ui/react";
import { useRef } from "react";
import "../styles/styles.css";
import Image from "next/image";
import UserEndPoint from "../constants/apiruls";
import { selectToken } from "../redux/authSlice";
import { useSelector } from "react-redux";
export default function AdminAddGoalForm({ isOpen, onClose }) {
  const [users, setUsers] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reward, setReward] = useState("");
  const [bonus, setBonus] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const token = useSelector(selectToken);
  const [selectAll, setSelectAll] = useState(false);
  const [goalNumbers, setGoalNumbers] = useState({});
  const [checkedUsers, setCheckedUsers] = useState({});

  const options = {
    minDate: new Date(), // Set minimum date to today
    mode: "range",
    altInputClass: "hide",
    dateFormat: "Y-m-d",
    inline: false,
    maxDate: new Date("01-01-3000"),
  };
  const calendarRef = useRef(null);
  const openCalendar = () => {
    calendarRef.current.flatpickr.open();
  };
  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken("colors", "#F6F6F6");


  const CalendarIcon = () => (
    <Image
      style={{ marginLeft: "15px" }}
      src="calender.svg"
      width={17}
      height={17}
      alt="icon"
    />
  );
  const handleSelectAllChange = () => {
    const updatedCheckedUsers = {};
    const newSelectAll = !selectAll;

    users.forEach((user) => {
      updatedCheckedUsers[user] = newSelectAll;
    });

    setCheckedUsers(updatedCheckedUsers);
    setSelectAll(newSelectAll);
  };

  const handleUserCheckboxChange = (user) => {
    setCheckedUsers((prevCheckedUsers) => {
      const updatedCheckedUsers = {
        ...prevCheckedUsers,
        [user]: !prevCheckedUsers[user],
      };
  
      // Check if all individual checkboxes are checked and update "Select All" accordingly
      const allUsersChecked = users.every((u) => updatedCheckedUsers[u]);
      setSelectAll(allUsersChecked);
  
      return updatedCheckedUsers;
    });
  };
  
  const handleGoalNumberChange = (user, value) => {
    setGoalNumbers((prevGoalNumbers) => ({
      ...prevGoalNumbers,
      [user]: value,
    }));
  };
  


  useEffect(() => {
    const getAllUsers = async () => {
      try {

        const data = await fetch(`${UserEndPoint}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const Users = await data.json()
        const filteredUsers = Users.filter(user => user.role === 3);
        setUsers(filteredUsers);
        const initialGoalNumbers = filteredUsers.reduce((acc, user) => {
          acc[user.id] = ""; // Assuming user.id is unique, adjust accordingly
          return acc;
        }, {});
        setGoalNumbers(initialGoalNumbers);

        const initialCheckedUsers = filteredUsers.reduce((acc, user) => {
          acc[user.id] = false; // Assuming user.id is unique, adjust accordingly
          return acc;
        }, {});
        setCheckedUsers(initialCheckedUsers);
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()

  }, [])
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };
  useEffect(() => {
    if (selectedDates.length === 2) {
      setStartDate(selectedDates[0].toISOString().split('T')[0])
      setEndDate(selectedDates[1].toISOString().split('T')[0])
      }
  }, [selectedDates])
    const CreateNewGoal = async () => {
      console.log(selectedDates)
      
      console.log(startDate,endDate,bonus, repeat,reward)
      // console.log(typeof startDate)
      // e.preventDefault();
    }
  


  return (
    <div>
      <Drawer size="menu" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          style={{
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
            paddingTop: "1.5rem",
          }}
        >
          <DrawerCloseButton style={{ marginTop: "2rem" }} />
          <DrawerHeader fontFamily="lato700" fontSize="22px">
            Set Goal Details
          </DrawerHeader>
          <DrawerBody marginBottom="3vh" className="drawercontainer">
            <Stack spacing="">
              <Box>
                <Container
                  onClick={openCalendar}
                  placeholder="Select Date"
                  style={{ width: "fit-content" }}
                  padding={0}
                  margin={0}
                  borderRadius="10px"
                >
                  <div
                    style={{
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
                        border: "1px solid #ced4da",
                        borderRadius: "10px",
                      }}
                      ref={calendarRef}
                      placeholder="Select date"
                      className="flatpickr-goal"
                      options={options}
                      value={selectedDates}
                      onChange={(dates) => handleDateChange(dates)}
                    >
                      <div className="datepicker-container">
                        <CalendarIcon />
                      </div>
                    </Flatpickr>
                  </div>{" "}
                </Container>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <FormLabel
                  htmlFor="username"
                  fontFamily="poppinsmed"
                  fontSize="14px"
                  marginBottom="4px"
                  color="#000000"
                >
                  Goal Rewards
                </FormLabel>
                <Input
                  type="text"
                  name="Email"
                  placeholder="Goal Reward"
                  style={{ border: "1px solid #ced4da" }}
                  borderRadius="10px"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  height="45px"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <FormLabel
                  htmlFor="username"
                  fontFamily="poppinsmed"
                  fontSize="14px"
                  color="#000000"
                >
                  Bonus Goal
                </FormLabel>
                <Input
                  type="number"
                  name="number"
                  placeholder="Enter Number"
                  borderRadius="10px"
                  height="45px"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>

              <Checkbox
                colorScheme="#0D7A79"
                borderRadius="4px"
                bg="white"
                borderColor="#03AF9F"
                outlineColor="#03AF9F" // S // Set the color scheme to green
                iconColor="#03AF9F"
                isChecked={repeat}
                onChange={() => setRepeat(!repeat)}
                                style={{ margin: "22px 0px 16px 0px" }}
              >
                <Text
                  fontWeight="600"
                  letterSpacing="0.5px"
                  color="#494949"
                  fontFamily="lato400"
                  fontSize="13px"
                >
                  Repeat
                </Text>
              </Checkbox>
              <Box paddingTop={0} className="tablecontainer" height="200px" overflowX="hidden" overflowY="auto">
                <Table size="md" bg="white" className="table">
                  <Thead>
                    <Tr backgroundColor="#03AF9F" height="8vh">
                      <Th
                        style={{
                          borderBottom: "none",
                          padding: "0px 0px 0px 12px",
                        }}
                        fontSize="2vh"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="8vh"
                      >
                        <Text
                          // width="6vw"
                          fontFamily="poppinsreg"
                          color="#0B393E"
                          fontSize="13px"
                        >
                          Assign All
                        </Text>
                        <Checkbox
                          isChecked={selectAll}
                          onChange={handleSelectAllChange}
                          colorScheme="#0D7A79"
                          borderColor="white"
                          ml={1}
                          borderRadius="4px"
                          bg="white"
                          outlineColor="#03AF9F" // S // Set the color scheme to green
                          iconColor="#03AF9F"
                        />
                      </Th>
                      <Th
                        style={{ borderBottom: "none", padding: "0px 12px" }}
                        width="33.3%"
                        fontFamily="poppinsreg"
                        color="#0B393E"
                        fontSize="13px"
                      >
                        Name
                      </Th>
                      <Th
                        style={{ borderBottom: "none", padding: "0px" }}
                        width="33.3%"
                        fontFamily="poppinsreg"
                        color="#0B393E"
                        fontSize="13px"
                      >
                        Goal No{" "}
                        <Input
                          id="goalNumber"
                          type="number"
                          width="2.5vw"
                          fontSize="13px"
                          padding="6px"
                          border="1px solid #ced4da"
                          height="4vh"
                          backgroundColor="white"
                          value={goalNumbers[users[0]]}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setGoalNumbers((prevGoalNumbers) => {
                              const updatedGoalNumbers = { ...prevGoalNumbers };
                              users.forEach((user) => {
                                updatedGoalNumbers[user] = newValue;
                              });
                              return updatedGoalNumbers;
                            });
                          }}
                        />
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user) => (
                      <Tr
                        key={user._id}
                        style={{
                          height: "8vh",
                          padding: 0,
                          borderRadius: "6px",
                        }}
                      >
                        <Td
                          backgroundColor="white"
                          width="33.3%"
                          style={{ padding: "5px 30px", borderBottom: "none" }}
                        >
                          <Checkbox
                            isChecked={checkedUsers[user]}
                            onChange={() => handleUserCheckboxChange(user)}
                            colorScheme="#0D7A79"
                            padding="8px" // Set the color scheme to green
                            iconColor="#03AF9F"
                            borderColor="#03AF9F" // Set the border color to #03AF9F
                            outlineColor="#03AF9F" // S
                            style={{ outline: "none" }}
                            className="checkbox-Active"
                          />
                        </Td>
                        <Td
                          backgroundColor="white"
                          width="33.3%"
                          style={{ padding: "0 12px", borderBottom: "none" }}
                        >
                          <Text>
                            {`${user.firstName} ${user.lastName}`}</Text>
                        </Td>
                        <Td
                          backgroundColor="white"
                          width="33.3%"
                          style={{ padding: "5px 30px", borderBottom: "none" }}
                        >
                          <Input
                            type="number"
                            bgColor={"white"}
                            height="5vh"
                            fontFamily="poppinsreg"
                            fontSize="13px"
                            padding="10px"
                            border="1px solid #ced4da"
                            width="3vw"
                            value={goalNumbers[user]}
                            onChange={(e) =>
                              handleGoalNumberChange(user, e.target.value)
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              <Button
                bg="#03AF9F"
                color="white"
                _hover={{ bg: "#0d7a79" }}
                size="lg"
                onClick={CreateNewGoal}
              >
                Submit
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>{" "}
    </div>
  );
}
