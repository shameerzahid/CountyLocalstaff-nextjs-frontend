"use client";
import { Box, Container, Heading } from "@chakra-ui/react";
import "../styles/styles.css";
import Sidebar from "../components/sidebar/Sidebar";
import Flatpickr from "react-flatpickr";
import Image from "next/image";
// import SuccessMsg from "../components/Popup/SuccessMsg";
// import Error from "../components/Popup/Error";
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
  Text,
  useToken,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import GoalEndPoint from "../constants/goalurls";
import {
  selectReports, setReports,
  clearReports,
  toggleReportLoading,
  selectLoading
} from "../redux/AdminReportSlice"; // Import the necessary actions and selectors
import { useRouter } from "next/navigation";

export default function Reports() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch()
  const reports = useSelector(selectReports);
  const loading = useSelector(selectLoading);
  const router = useRouter()
  console.log(reports)
  
  const [selectedDates, setSelectedDates] = useState([]);
  const options = {
    mode: "range",
    altInputClass: "hide",
    dateFormat: "m-d-y",
    inline: false,
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
  // const numRows = Math.min(Math.floor(70 / rowHeight), reports.length); // Calculate the number of rows that fit within 70vh
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
  //filter base on progress
  const filterUsersByProgress = (reports, selectedOption) => {
    console.log(selectedOption)
    switch (selectedOption) {
      case "100% and lower":
        return reports.filter((report) => report.goalStates.completed_percentage <= 100);
      case "70% and lower":
        return reports.filter((report) => report.goalStates.completed_percentage <= 70);
      case "50% and lower":
        return reports.filter((report) => report.goalStates.completed_percentage <= 50);
      case "25% and lower":
        return reports.filter((report) => report.goalStates.completed_percentage <= 25);
      default:
        return reports;
    }
  };
  //filter base on date
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const filterUsersByDate = (reports, selectedDates) => {
    if (selectedDates.length === 2) {
      const startDate = new Date(selectedDates[0]);
      const endDate = new Date(selectedDates[1]);
      return reports.filter(
        (report) =>
          new Date(report.endDate) >= startDate && new Date(report.endDate) <= endDate
      );
    } else {
      return reports;
    }
  };
  const filterUsers = (reports, selectedDates, selectedOption) => {
    const usersFilteredByDate = filterUsersByDate(reports, selectedDates);
    return filterUsersByProgress(usersFilteredByDate, selectedOption);
  };
  const filteredUsersCombined = filterUsers(
    reports,
    selectedDates,
    selectedOption
  );
  const handleReset = () => {
    setSelectedDates("");
    setSelectedOption(""); // Set the default option
  };
  const GetAllEndGoals = async () => {
    try {
      const res = await fetch(`${GoalEndPoint}/ended-goals`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      const stat = await res.status;
      if (stat == 200) {
        dispatch(setReports(data))
        console.log(data)
      }
      else {
        console.log(data.error)
      }
      // setLoading(false)
    } catch (error) {
      console.log("error : ", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    GetAllEndGoals()
  }, [])
  const GoalDetails = () => {
    router.push('/reports-info')
  }

  return (
    <>
      <div
        className="usertop bg-red "
        style={{
          backgroundColor: "#F4F9F6",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar />
        {loading ?
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", width: "60vw" }}>
            <div>Loading...</div>
          </div> :
          <Box className="md:mx-10  mx-5 mt-6 " width="calc(100% - 11vw)">
            <Heading fontSize="2.4rem" fontFamily="lato700" color="#0B393E">
              Reports
            </Heading>
            <div className="Reports">
              <div className="ReportsSection ">
                <div className="md:flex md:items-center md:w-fit w-[100%] ">
                  <p
                    style={{
                      padding: "0px 0px 7px 0px",
                      fontFamily: "poppins",
                      letterSpacing: ".5px",
                      fontWeight: "600",
                      color: "#0b393e",
                    }}
                    className="filter-text md:mr-[10px] lg:hidden  llg:block mr-0"
                  >
                    Filter Goals Date{" "}
                  </p>
                  <Box
                    onClick={openCalendar}
                    className=" md:w-fit w-[100%]"
                    placeholder="Select Date"
                    padding={0}
                    margin={0}

                  >
                    <div
                      className="datepicker-container md:w-[250px] h-[38px] w-[100%] md:h-[38px]"
                      style={{
                        position: "relative",

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
                        value={selectedDates}
                        onChange={(dates) => handleDateChange(dates)}
                      >
                        <div className="datepicker-container">
                          <CalendarIcon />
                        </div>
                      </Flatpickr>
                    </div>{" "}
                  </Box>
                  <Box
                    position="relative"
                    className="md:mt-0 md:w-[250px] md:h-[38px] w-[100%] mt-2 md:ml-[10px] ml-0"

                  >
                    <Text
                      onClick={() => setIsOpen(!isOpen)}
                      cursor="pointer"
                      placeholder="Select an option"
                      className="text-select"
                      style={{
                        border: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "start",
                        padding: "0px 16px",
                        color: "#03AF9F",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      borderRadius="md"
                    >
                      {selectedOption ? (
                        <>
                          <GoalIcon />{" "}
                          <span style={{ padding: "0px 8px" }}>
                            {selectedOption}
                          </span>
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
                              padding: "0px 8px",
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
                </div>
                <div className="mt-2 lg:mt-0">
                  <Button
                    fontSize="14px"
                    fontFamily="poppins"
                    height="38px"
                    border="1px solid #03AF9F"
                    padding="0.375rem 0.85rem"
                    borderRadius="0.25rem"
                    lineHeight="21px"
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
                    padding="0.375rem 0.8rem"
                    borderRadius="0.2rem"
                    lineHeight="21px"
                    fontWeight="500"
                    bg="transparent"
                    color="#03AF9F"
                    _hover={{ bg: "#03AF9F", color: "white" }}
                    onClick={handleReset}
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
              {filteredUsersCombined.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "1.1rem",
                    color: "#555",
                  }}
                >
                  No Result Found
                </div>
              ) : (
                <>
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
                      style={{
                        borderCollapse: "separate",
                        borderSpacing: "0 1.2em",
                      }}
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
                </>
              )}
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
                // height={`${numRows * rowHeight}vh`}
                >
                  <Tbody>
                    {filteredUsersCombined
                      .map((report, index) => (
                        <Tr
                          key={report._id}
                          style={{
                            height: "4.5rem",
                            boxShadow: "0px 4px 16px -4px rgba(0, 0, 0, 0.12)",
                            borderRadius: "6px",
                          }}
                        >
                          <Td
                            bg={
                              index % 2 === 0 ? `${bg + "!important"}` : "white"
                            }
                            style={{
                              padding: "0 16px",
                              borderTop: "0.1px solid  #ccc",
                              width: "27%",
                              fontFamily: "poppinsreg",
                              fontSize: "14px",
                            }}
                          >
                            {new Date(report.endDate).toISOString().split('T')[0]}                         </Td>

                          <Td
                            bg={
                              index % 2 === 0 ? `${bg + "!important"}` : "white"
                            }
                            style={{
                              padding: "0 16px",
                              borderTop: "0.1px solid  #ccc",
                              width: "45%",
                              fontFamily: "poppinsreg",
                              fontSize: "12px",
                            }}
                          >
                            {report.goalStates.completed_percentage}% Completed +{" "}
                            <span style={{ color: "#03AF9F" }}>{report.goalStates.bonus_percentage}% Bonus</span>
                            <Progress value={report.goalStates.completed_percentage} size="md" />
                          </Td>
                          <Td
                            bg={
                              index % 2 === 0 ? `${bg + "!important"}` : "white"
                            }
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
                              onClick={() => GoalDetails()}
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
        }

      </div>
    </>
  );
}
