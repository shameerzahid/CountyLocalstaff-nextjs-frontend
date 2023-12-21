"use client";
import { Box, Container, Heading } from "@chakra-ui/react";
import "../styles/styles.css";
import Sidebar from "../components/sidebar/Sidebar";
import Flatpickr from "react-flatpickr";
import Image from "next/image";
import "flatpickr/dist/flatpickr.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  List,
  ListItem,
  Th,
  Td,
  Button,
  Flex,
  Text,
  Select,
  useToken,
  useDisclosure,
  Progress,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
export default function Reports() {
  const users = [
    {
      id: 1,
      name: "John Do22",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      date: "12-20-2023",
      bonus: "0% bonus",
    },
    {
      id: 2,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      date: "12-20-2023",
      bonus: "0% bonus",
    },
    {
      id: 1,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      date: "12-20-2023",
      bonus: "0% bonus",
    },
    {
      id: 1,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      date: "12-20-2023",
      bonus: "0% bonus",
    },
    {
      id: 1,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      date: "12-20-2023",
      bonus: "0% bonus",
    },

    // Add more users as needed
  ];

  const options = {
    minDate: new Date(), // Set minimum date to today
    mode: "range",
    altInputClass: "hide",
    dateFormat: "m-d-y",
    appendTo: document.body, // Append to the body or a specific container
    inline: false,
    // wrap: true,
    maxDate: new Date("01-01-3000"),
  };

  const calendarRef = useRef(null);

  const openCalendar = () => {
    calendarRef.current.flatpickr.open();
  };
  const CalendarIcon = () => (
    <Image
      style={{ marginLeft: "15px" }}
      src="calender.svg"
      width={17}
      height={17}
      alt="icon"
    />
  );
  const GoalIcon = () => (
    <Image
      style={{ marginRight: "4px" }}
      src="goal.svg"
      width={17}
      height={17}
      alt="icon"
    />
  );
  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken("colors", "#F6F6F6");

  const optionnns = [
    "100% and lower",
    "70% and lower",
    "50% and lower",
    "25% and lower",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
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
        <Box margin="25px 40px 0 40px" width="calc(100% - 11vw)">
          <Heading fontSize="2.4rem" fontFamily="lato700" color="#0B393E">
            Reports
          </Heading>
          <div className="Reports">
            <div className="ReportsSection">
              <p
                style={{
                  padding: "0px 78px 7px 20px",
                  fontFamily: "poppins",
                  letterSpacing: ".5px",
                  fontWeight: "600",
                  color: "#212529",
                }}
                className="filter-text"
              >
                Filter Goals Date{" "}
              </p>
              <Container
                onClick={openCalendar}
                placeholder="Select Date"
                style={{ width: "fit-content" }}
                padding={0}
                margin={0}
              >
                <div
                  className="datepicker-container"
                  style={{
                    // padding: "2px",

                    position: "relative",
                    width: "250px",
                    height: "38px",
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

              <Box
                position="relative"
                style={{ width: "200px", marginLeft: "0px" }}
              >
                <Text
                  onClick={() => setIsOpen(!isOpen)}
                  cursor="pointer"
                  // padding={2}
                  placeholder="Select an option"
                  className="text-select"
                  style={{
                    border: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  borderRadius="md"
                >
                  {selectedOption ? (
                    <>
                      <GoalIcon /> <span>{selectedOption}</span>
                    </>
                  ) : (
                    <>
                      <GoalIcon />{" "}
                      <span
                        style={{
                          color: "#039D8F",
                          fontSize: ".9rem",
                          fontFamily: "poppins",
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
                {isOpen && (
                  <List
                    position="absolute"
                    top="100%"
                    left={0}
                    ml={5}
                    mt={0.5}
                    zIndex={1}
                    width="90%"
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
                          color: "#16181b",
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
              <div>
                <Button
                  fontSize="14px"
                  fontFamily="poppins"
                  height="38px"
                  border="1px solid #03AF9F"
                  padding="0.375rem 0.75rem"
                  borderRadius="0.25rem"
                  lineHeight="21px"
                  marginLeft="10px"
                  fontWeight="400"
                  bg="#03AF9F"
                  color="white"
                  _hover={{ bg: "#039D8F", color: "white" }}
                >
                  Apply
                </Button>
                <Button
                  fontSize="14px"
                  fontFamily="poppins"
                  height="38px"
                  marginLeft="10px"
                  border="1px solid #03AF9F"
                  padding="0.375rem 0.75rem"
                  borderRadius="0.2rem"
                  lineHeight="21px"
                  fontWeight="500"
                  bg="transparent"
                  color="#03AF9F"
                  _hover={{ bg: "#03AF9F", color: "white" }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              overflow: "hidden",
              height: "73.5vh",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "20px",
              margin: "8px 2px 0 2px",
              paddingLeft: "18px",
              border: "1px solid #ccc",
              paddingRight: "18px",
            }}
          >
            <div
              className="tablecontainer"
              style={{
                height: "59px",
                width: "100%",
                overflowY: "hidden",
                backgroundColor: "white",
              }}
            >
              <Table
                className="table"
                style={{ borderCollapse: "separate", borderSpacing: "0 1.2em" }}
                variant="striped"
                size="md"
                bg="white"
              >
                <Thead backgroundColor="white">
                  <Tr style={{ height: "52px" }}>
                    <Th
                      style={{
                        borderBottom: "none",
                        padding: "0px 16px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        fontFamily: "poppinsmed",
                        color: "#0B393E",
                        width: "25.7%",
                      }}
                    >
                      END GOAL DATE
                    </Th>

                    <Th
                      style={{
                        borderBottom: "none",
                        padding: "0px 16px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        fontFamily: "poppinsmed",
                        color: "#0B393E",
                        width: "45%",
                      }}
                    >
                      progress
                    </Th>
                    <Th
                      style={{
                        borderBottom: "none",
                        padding: "0px 16px",
                        fontSize: "0.875rem",
                        fontFamily: "poppinsreg",
                        color: "#0B393E",
                        width: "15%",
                      }}
                    ></Th>
                  </Tr>
                </Thead>{" "}
              </Table>
            </div>
            <div
              className="tablecontainer"
              style={{
                height: "60vh",
                overflowY: "auto",
                backgroundColor: "white",
              }}
            >
              <Table
                className="table"
                style={{
                  borderCollapse: "separate",
                  width: "100%",
                  borderSpacing: "0 0.6em",
                }}
                variant="striped"
                size="md"
                bg="white"
                height={`${numRows * rowHeight}vh`}
              >
                <Tbody>
                  {users.slice(0, numRows).map((user, index) => (
                    <Tr
                      key={user.id}
                      style={{
                        height: "4.5rem",
                        boxShadow: "0px 4px 16px -4px rgba(0, 0, 0, 0.12)",
                        borderRadius: "6px",
                      }}
                    >
                      <Td
                        bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                        style={{
                          padding: "0 16px",
                          borderTop: "0.1px solid  #ccc",
                          width: "27%",
                          fontFamily: "poppinsreg",
                          fontSize: "14px",
                        }}
                      >
                        {user.date}
                      </Td>

                      <Td
                        bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                        style={{
                          padding: "0 16px",
                          borderTop: "0.1px solid  #ccc",
                          width: "45%",
                          fontFamily: "poppinsreg",
                          fontSize: "12px",
                        }}
                      >
                        {user.progress} +{" "}
                        <span style={{ color: "#03AF9F" }}>{user.bonus}</span>
                        <Progress value={0} size="md" />
                      </Td>
                      <Td
                        bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                        style={{
                          padding: "0 16px",
                          borderTop: "0.1px solid  #ccc",
                          width: "18%",
                        }}
                      >
                        <Button
                          fontSize="16px"
                          fontFamily="poppinsmed"
                          height="38px"
                          border="1px solid #03AF9F"
                          padding="0.375rem 0.75rem"
                          borderRadius="0.25rem"
                          lineHeight="24px"
                          fontWeight="400"
                          bg="transparent"
                          color="#03AF9F"
                          _hover={{ bg: "#03AF9F", color: "white" }}
                        >
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>{" "}
          </div>
        </Box>
      </div>
    </>
  );
}
