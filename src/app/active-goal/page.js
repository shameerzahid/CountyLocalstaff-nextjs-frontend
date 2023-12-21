
"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useDisclosure, Progress, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Container } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
import anychart from 'anychart';
import '../styles/styles.css'
import { useEffect, useRef, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import './activegoal.css'
import Image from "next/image";
import calender from '../assets/calender-lg.png'
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
            chart.palette(["#03AF9F", "#FFCE21", "#DCFF07"])
            // initiate drawing the chart
            chart.draw();
        });
    })

    const users = [
        {
            id: 1,
            name: "Bob Williams ",
            lastupdated: "00-00-0000",
            progress: "0% completed",
            bonus: "0% bonus"
        },
        {
            id: 2,
            name: "Usertest test",
            lastupdated: "00-00-0000",
            progress: "0% completed",
            bonus: "0% bonus"
        },
        {
            id: 1,
            name: "John Doe",
            lastupdated: "00-00-0000",
            progress: "0% completed",
            bonus: "0% bonus"
        },
        {
            id: 1,
            name: "John Doe",
            lastupdated: "00-00-0000",
            progress: "0% completed",
            bonus: "0% bonus"
        },
        {
            id: 1,
            name: "John Doe",
            lastupdated: "00-00-0000",
            progress: "0% completed",
            bonus: "0% bonus"
        },

        // Add more users as needed
    ];

    const rowHeight = 3; // Set the desired height for each row in vh
    const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
    const bg = useToken('colors', '#F6F6F6')
    return (
        <div className="usertop" style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
            <Sidebar />
            <Box margin="25px 40px 0 40px" width="calc(100% - 11vw)">
                <Heading fontSize="2.4rem" fontFamily="lato700" color="#0B393E" marginBottom="1.5rem">
                    Active Goal
                </Heading>
                <SimpleGrid gap={2} templateColumns='repeat(auto-fill, minmax(17vw, 1fr))'>
                    <Card marginRight={20} height="fit-content" width="100%" borderRadius="16px" border="1px solid #ccc">

                        <CardBody paddingRight={0} paddingLeft={0} paddingTop="20px" >
                            <Heading fontSize="18px" textAlign="center" fontFamily="poppinsmed" fontWeight="500">Bob Williams</Heading>
                            <Text marginTop="18px" fontSize="15px" textAlign="center" color="#212529" fontWeight="400" lineHeight="24px">12-2-23</Text>
                            <Text textAlign="center" style={{ fontFamily: "poppinsreg", fontSize: "12px", marginTop: "18px", paddingLeft: 0, paddingRight: 0, width: '100%' }}>0% Completed + <span style={{ color: "#03AF9F" }}>0% Bonus</span>
                                <Progress style={{ margin: "auto", padding: "0" }} value={0} size='md' />
                            </Text>
                        </CardBody>
                    </Card>
                    <Card marginRight={20} height="fit-content" width="100%" borderRadius="16px" border="1px solid #ccc">

                    <CardBody paddingRight={0} paddingLeft={0} paddingTop="20px" >
                            <Heading fontSize="18px" textAlign="center" fontFamily="poppinsmed" fontWeight="500">Bob Williams</Heading>
                            <Text marginTop="18px" fontSize="15px" textAlign="center" color="#212529" fontWeight="400" lineHeight="24px">12-2-23</Text>
                            <Text textAlign="center" style={{ fontFamily: "poppinsreg", fontSize: "12px", marginTop: "18px", paddingLeft: 0 }}>0% Completed + <span style={{ color: "#03AF9F" }}>0% Bonus</span>
                                <Progress style={{ margin: "auto" }} value={0} size='md' />
                            </Text>
                        </CardBody>
                    </Card>
                    <Card marginRight={20} height="fit-content" width="100%" borderRadius="16px" border="1px solid #ccc">

                    <CardBody paddingRight={0} paddingLeft={0} paddingTop="20px" >
                            <Heading fontSize="18px" textAlign="center" fontFamily="poppinsmed" fontWeight="500">Bob Williams</Heading>
                            <Text marginTop="18px" fontSize="15px" textAlign="center" color="#212529" fontWeight="400" lineHeight="24px">12-2-23</Text>
                            <Text textAlign="center" style={{ fontFamily: "poppinsreg", fontSize: "12px", marginTop: "18px", paddingLeft: 0 }}>0% Completed + <span style={{ color: "#03AF9F" }}>0% Bonus</span>
                                <Progress style={{ margin: "auto" }} value={0} size='md' />
                            </Text>
                        </CardBody>
                    </Card>
                    <Flex flexDir="row" alignItems="center" height="11vh">
                <Image src={calender} height={58} alt="img" />
                <Flex flexDirection="column" fontSize="14px" fontWeight="500" paddingLeft="10px" paddingRight="15px" paddingTop="5px" color='#212529' lineHeight="22px">
                    <Text>Active Goal from</Text>
                    <Text>22-2-2023 to 22-3-2032</Text>
                </Flex> </Flex>
                </SimpleGrid>
                
                <Flex flexDirection="row" justifyContent="space-between" marginTop="1rem" >
                    <div style={{ overflow: "hidden", height: "59vh", width: "66.5%", backgroundColor: "white", borderRadius: "20px", margin: "0 0 0 0", paddingLeft: "20px", border: "1px solid #ccc", paddingRight: "20px" }}>
                        <div className="tablecontainer" style={{ height: "59px", width: "100%", overflowY: "hidden", backgroundColor: "white" }}>
                            <Table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 1.2em" }} variant="striped" size="md" bg="white" >
                                <Thead backgroundColor="white"         >
                                    <Tr style={{ height: "52px" }} >
                                        <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "20%", textAlign: "center" }} >Ranking</Th>
                                        <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "20%", textAlign: "center" }}>Users</Th>
                                        <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "15%" }}>Updated on</Th>
                                        <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "45%", textAlign: "center" }}>Progress</Th>
                                    </Tr>
                                </Thead> </Table></div>
                        <div className="tablecontainer" style={{ height: "60vh", width: "100%", overflowY: "auto", backgroundColor: "white" }}>
                            <Table className="table" style={{ borderCollapse: "separate", width: "100%", borderSpacing: "0 0.6em" }} variant="striped" size="md" bg="white" height={`${numRows * rowHeight}vh`}>
                                <Tbody>
                                    {users.slice(0, numRows).map((user, index) => (
                                        <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius: "6px" }}>
                                            <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px", textAlign: "center" }} >#5</Td>
                                            <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px", textAlign: "center" }} >{user.name}</Td>
                                            <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px" }} >{user.lastupdated}</Td>
                                            <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "45%", fontFamily: "poppinsreg", fontSize: "12px", textAlign: "center" }} >{user.progress} + <span style={{ color: "#03AF9F" }}>{user.bonus}</span>
                                                <Progress style={{ margin: 'auto' }} value={0} size='md' />
                                            </Td>

                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                        </div> </div>
                    <Flex flexDirection="column" height="59vh" width="31%" backgroundColor="white" borderRadius="15px" border="1px solid #ccc">
                        <h5 style={{ paddingLeft: "1.5rem", fontSize: "1.1rem", paddingTop: "1rem", fontFamily: "poppinsmed" }}>Team Overview</h5>
                        <div id="container" style={{ height: '80%', width: "100%", margin: "auto", marginBottom: "0", marginTop: "5px" }}></div>
                    </Flex>
                </Flex>
            </Box>

        </div>
    )
}