"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
  useToken,
  useDisclosure,
  Progress,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
import anychart from "anychart";
import "../styles/styles.css";
import { useEffect, useRef, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import "./activegoal.css";
import Image from "next/image";
import calender from "../assets/calender-lg.png";
export default function ActiveGoals() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    anychart.onDocumentReady(function () {
      // create data
      var data = [
        { x: "Completed", value: 1 },
        { x: "Bonus", value: 2 },
        { x: "Incomplete", value: 3 },
      ];

      // create a chart and set the data
      var chart = anychart.pie(data);

      // set the chart title
      // chart.title("Team Overview");

      // set the container id
      chart.container("container");
      chart.palette(["#03AF9F", "#FFCE21", "#DCFF07"]);
      // initiate drawing the chart
      chart.draw();

      const tableContainer = document.querySelector(".table-scroll-auto");

      // Set initial scroll direction
      let scrollDirection = 1; // 1 for scrolling down, -1 for scrolling up
  
      // Scroll function to scroll the table
      const scrollTable = () => {
        if (tableContainer) {
          tableContainer.scrollTop += scrollDirection;
  
          // Check if reached the bottom or top, change direction
          if (
            tableContainer.scrollTop ===
            tableContainer.scrollHeight - tableContainer.clientHeight
          ) {
            scrollDirection = -1; // Change to scrolling up
          } else if (tableContainer.scrollTop === 0) {
            scrollDirection = 1; // Change to scrolling down
          }
        }
      };
  
      // Set an interval to scroll the table every 0.2 seconds
      const scrollInterval = setInterval(scrollTable, 200);

      // Clear the interval when the component is unmounted
      return () => clearInterval(scrollInterval);
    });
  });

  const users = [
    {
      id: 1,
      name: "Bob Williams ",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      bonus: "0% bonus",
    },
    {
      id: 2,
      name: "Usertest test",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      bonus: "0% bonus",
    },
    {
      id: 1,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      bonus: "0% bonus",
    },
    {
      id: 1,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      bonus: "0% bonus",
    },
    {
      id: 1,
      name: "John Doe",
      lastupdated: "00-00-0000",
      progress: "0% completed",
      bonus: "0% bonus",
    },

    // Add more users as needed
  ];

  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken("colors", "#F6F6F6");
  return (
    <div
      className="usertop"
      style={{
        backgroundColor: "#F4F9F6",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar />
      <Box className="lg:mt-6 lg:mx-10 mx-5"  width="calc(100% - 11vw)">
        <Heading
          fontSize="2.4rem"
          fontFamily="lato700"
          color="#0B393E"
          marginBottom="1.5rem"
        >
          Active Goal
        </Heading>
        <SimpleGrid
          gap={2}
          className="lg:grid-cols-4 grid-cols-2"
        >
          <Card
          className="col-span-1 min-w-[16vw] lg:order-1 order-2"
            marginRight={20}
            height="fit-content"
            width="100%"
            borderRadius="16px"
            border="1px solid #ccc"
          >
            <CardBody paddingRight={0} paddingLeft={0} paddingTop="20px">
              <Flex className="items-center justify-center ">
                <Image src="one.svg" height={38} width={35} alt="img" />
                <Heading
                  fontSize="18px"
                  textAlign="center"
                  ml={2}
                  fontFamily="poppinsmed"
                  fontWeight="500"
                >
                  Bob Williams
                </Heading>
              </Flex>
              <Text
                marginTop="10px"
                fontSize="15px"
                textAlign="center"
                color="#212529"
                fontWeight="400"
                lineHeight="24px"
              >
                00-00-0000
              </Text>
              <Text
                textAlign="center"
                style={{
                  fontFamily: "poppinsreg",
                  fontSize: "12px",
                  marginTop: "10px",
                  paddingLeft: 0,
                  paddingRight: 0,
                  width: "100%",
                }}
              >
                0% Completed +{" "}
                <span style={{ color: "#03AF9F" }}>0% Bonus</span>
                <Progress
                  style={{ margin: "auto", padding: "0" }}
                  value={0}
                  size="md"
                />
              </Text>
            </CardBody>
          </Card>
          <Card
          className="col-span-1 min-w-[16vw] lg:order-2 order-3"
            marginRight={20}
            height="fit-content"
            width="100%"
            borderRadius="16px"
            border="1px solid #ccc"
          >
            <CardBody paddingRight={0} paddingLeft={0} paddingTop="20px">
              <Flex className="items-center justify-center ">
                <Image src="two.svg" height={38} width={35} alt="img" />
                <Heading
                  fontSize="18px"
                  textAlign="center"
                  ml={2}
                  fontFamily="poppinsmed"
                  fontWeight="500"
                >
                  userTest user
                </Heading>
              </Flex>
              <Text
                marginTop="10px"
                fontSize="15px"
                textAlign="center"
                color="#212529"
                fontWeight="400"
                lineHeight="24px"
              >
                00-00-0000
              </Text>
              <Text
                textAlign="center"
                style={{
                  fontFamily: "poppinsreg",
                  fontSize: "12px",
                  marginTop: "10px",
                  paddingLeft: 0,
                  paddingRight: 0,
                  width: "100%",
                }}
              >
                0% Completed +{" "}
                <span style={{ color: "#03AF9F" }}>0% Bonus</span>
                <Progress
                  style={{ margin: "auto", padding: "0" }}
                  value={0}
                  size="md"
                />
              </Text>
            </CardBody>
          </Card>
          <Card
          className="col-span-1 min-w-[16vw] lg:order-3 order-4"
            marginRight={20}
            height="fit-content"
            width="100%"
            borderRadius="16px"
            border="1px solid #ccc"
          >
            <CardBody paddingRight={0} paddingLeft={0} paddingTop="20px">
              <Flex className="items-center justify-center ">
                <Image src="three.svg" height={38} width={35} alt="img" />
                <Heading
                  fontSize="18px"
                  textAlign="center"
                  ml={2}
                  fontFamily="poppinsmed"
                  fontWeight="500"
                >
                  bob dod
                </Heading>
              </Flex>
              <Text
                marginTop="10px"
                fontSize="15px"
                textAlign="center"
                color="#212529"
                fontWeight="400"
                lineHeight="24px"
              >
                00-00-0000
              </Text>
              <Text
                textAlign="center"
                style={{
                  fontFamily: "poppinsreg",
                  fontSize: "12px",
                  marginTop: "10px",
                  paddingLeft: 0,
                  paddingRight: 0,
                  width: "100%",
                }}
              >
                0% Completed +{" "}
                <span style={{ color: "#03AF9F" }}>0% Bonus</span>
                <Progress
                  style={{ margin: "auto", padding: "0" }}
                  value={0}
                  size="md"
                />
              </Text>
            </CardBody>
          </Card>

          <div

            marginRight={20}
            marginTop={10}
            background={"red"}
            outline={"none"}
            height="fit-content"
            className="col-span-1 min-w-[16vw] lg:order-4 order-1"
            width="100%"
          >
            <Flex className="flex justify-center items-center  py-5">
              <Image src={calender} height={58} alt="img" />
              <Flex
                flexDirection="column"
                fontSize="14px"
                fontWeight="500"
                paddingLeft="10px"
                paddingRight="15px"
                color="#212529"
                lineHeight="22px"
              >
                <Text>Active Goal from</Text>
                <Text className="text-[13px]">22-2-2023 to 22-3-2032</Text>
              </Flex>
            </Flex>
          </div>
        </SimpleGrid>

        <Flex
   
          className="lg:flex-row lg:justify-between lg:mt-[1rem] mt-4 flex-col"
        
        >
          <div
          className="lg:w-[66.5%] h-[59vh] w-[100%]"
            style={{
              overflow: "hidden",
          
              backgroundColor: "white",
              borderRadius: "20px",
              margin: "0 0 0 0",
              paddingLeft: "20px",
              border: "1px solid #ccc",
              paddingRight: "20px",
            }}
          >
            <div
              className="tablecontainer "
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
                        fontFamily: "poppinsmed",
                        fontWeight: "500",
                        color: "#0B393E",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      Ranking
                    </Th>
                    <Th
                      style={{
                        borderBottom: "none",
                        padding: "0px 16px",
                        fontSize: "0.875rem",
                        fontFamily: "poppinsmed",
                        fontWeight: "500",
                        color: "#0B393E",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      Users
                    </Th>
                    <Th
                      style={{
                        borderBottom: "none",
                        // padding: "0px 16px",
                        fontSize: "0.875rem",
                        fontFamily: "poppinsmed",
                        fontWeight: "500",
                        color: "#0B393E",
                        width: "22%",
                      }}
                    >
                      Updated on
                    </Th>
                    <Th
                      style={{
                        borderBottom: "none",
                        padding: "0px 16px",
                        fontSize: "0.875rem",
                        fontFamily: "poppinsmed",
                        fontWeight: "500",
                        color: "#0B393E",
                        width: "45%",
                        textAlign: "center",
                      }}
                    >
                      Progress
                    </Th>
                  </Tr>
                </Thead>{" "}
              </Table>
            </div>
            <div
              className="tablecontainer table-scroll-auto"
              style={{
                height: "60vh",
                width: "100%",
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
                          width: "20%",
                          fontFamily: "poppinsreg",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        #5
                      </Td>
                      <Td
                        bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                        style={{
                          padding: "0 16px",
                          borderTop: "0.1px solid  #ccc",
                          width: "20%",
                          fontFamily: "poppinsreg",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {user.name}
                      </Td>
                      <Td
                        bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                        style={{
                        //   padding: "0 16px",        
                          borderTop: "0.1px solid  #ccc",
                          width: "20%",                      
                          fontFamily: "poppinsreg",
                          fontSize: "14px",
                        }}
                      >
                        {user.lastupdated}
                      </Td>
                      <Td
                        bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                        style={{
                          padding: "0 16px",
                          borderTop: "0.1px solid  #ccc",
                          width: "45%",
                          fontFamily: "poppinsreg",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        {user.progress} +{" "}
                        <span style={{ color: "#03AF9F" }}>{user.bonus}</span>
                        <Progress
                          style={{ margin: "auto" }}
                          value={0}
                          size="md"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>{" "}
          </div>
          <Flex
            flexDirection="column"
            height="59vh"
            
            className="lg:w-[31%] w-[100%]"
            backgroundColor="white"
            borderRadius="15px"
            border="1px solid #ccc"
          >
            <h5
              style={{
                paddingLeft: "1.5rem",
                fontSize: "1.1rem",
                paddingTop: "1rem",
                fontFamily: "poppinsmed",
              }}
            >
              Team Overview
            </h5>
            <div
              id="container"
              style={{
                height: "80%",
                width: "100%",
                margin: "auto",
                marginBottom: "0",
                marginTop: "5px",
              }}
            ></div>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}
