"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useDisclosure, Progress, Box, Heading, Icon } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
import anychart from 'anychart';
import '../styles/styles.css'
import { useEffect, useRef, useState } from "react";
import calender from '../assets/calendaricon.png'
import trophy from '../assets/trophy.png'
import stats from '../assets/statistics.png'
import goal from '../assets/mygoal.png'
import Image from "next/image";
import Sidebar from "../components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
export default function UserGoal() {


  useEffect(() => {
    anychart.onDocumentReady(function () {

      // create data
      var data = [
        { x: "Completed", value: 1 },
        { x: "Bonus", value: 2 },
        { x: "Incomplete", value: 3 },
      ];
      var chart = anychart.pie(data);
      chart.container("container");
      chart.palette(["#03AF9F", "#FFCE21", "#DCFF07"])
      chart.draw();
    });
  })

  const users = [
   
    // Add more users as needed
  ];

  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken('colors', '#F6F6F6')
    const router = useRouter();

  const handleIconClick = () => {
    // Go back one step in history
    router.back();
  };
  return (
    <div style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
    <Sidebar />
    <Box margin="27px 40px 20px 32px" width="calc(100% - 11vw)">
        <Flex flexDirection="row" alignItems="center" marginLeft="25px" marginBottom="3rem">
       <Icon backgroundColor="red" as={() =>( <svg  onClick={handleIconClick} style={{backgroundColor: "#03AF9F", cursor: "pointer", height: '1.7rem', borderRadius: "3px", width: "1.6rem"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.9999 11H6.41394L11.7069 5.707L10.2929 4.293L2.58594 12L10.2929 19.707L11.7069 18.293L6.41394 13H20.9999V11Z" fill="white"></path>
              </svg>)} />
      <Heading  marginLeft="15px" fontSize="2.4rem" fontFamily="lato700" color="#212529">Bob Williams</Heading> </Flex>
    <div style={{ padding: "0 0.5rem", marginTop: "1rem" }}>
      <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" paddingLeft="15px" paddingRight="15px" >
        <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={calender} />
        {/* <FaCalendarAlt style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem" color="#212529">Active Goal from</Text>
        <Text width="14rem" marginLeft="1.5rem" color="#212529">12-20-2023 to 12-22-2023</Text>
        <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={goal} />
        {/* <GoGoal style={{ marginLeft: "3rem" }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem" color="#212529">Goal Number</Text>
        <Text marginLeft="1.5rem" color="#212529">10</Text>
      </Flex>
      <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="0.7rem" paddingLeft="15px" paddingRight="15px" >
      <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={trophy} />
        {/* <GiTrophyCup style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem">Goal Reward</Text>
        <Text width="14rem" marginLeft="3.5rem">Anything</Text>
        <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={stats} />
        {/* <GiStairsGoal style={{ marginLeft: "2.8rem" }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem">Bonus Goal</Text>
        <Text marginLeft="2.4rem">10</Text>
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between" marginTop="1.5rem" >
        <div style={{ overflow: "hidden", height: "60.5vh", width: "66.5%", backgroundColor: "white", borderRadius: "20px", margin: "0 0 0 0", paddingLeft: "20px", paddingRight: "20px" }}>
          <div className="tablecontainer" style={{ height: "59px", width: "100%", overflowY: "hidden", backgroundColor: "white" }}>
            <Table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 1.2em" }} variant="striped" size="md" bg="white" >
              <Thead backgroundColor="white"         >
                <Tr style={{ height: "52px" }} >
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsreg", color: "#0B393E", width: "50%" }} >Recruited</Th>
                  {/* <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "0.875rem", fontFamily:"poppinsreg",color: "#0B393E", width: "20%"}}>Last Updated</Th> */}
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsreg", color: "#0B393E", width: "50%" }}>Updated</Th>
                  {/* <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "0.875rem", fontFamily:"poppinsreg",color: "#0B393E", width: "15%"}}></Th> */}
                </Tr>
              </Thead> </Table></div>
          <div className="tablecontainer" style={{ height: "50vh", overflowY: "auto", backgroundColor: "white" }}>
            <Table className="table" style={{ borderCollapse: "separate", width: "100%", borderSpacing: "0 0.6em" }} variant="striped" size="md" bg="white" height={`${numRows * rowHeight}vh`}>
              <Tbody>
                {users.slice(0, numRows).map((user, index) => (
                  <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius: "6px" }}>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "50%", fontFamily: "poppinsreg", fontSize: "14px" }} >{user.name}</Td>                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "50%", fontFamily: "poppinsreg", fontSize: "14px", textAlign: "center" }} >{user.goalNo}</Td>
                  
                  </Tr>
                ))}
              </Tbody>
            </Table>

          </div> </div>
          <Flex flexDirection="column" height="60.5vh" width="31%" backgroundColor="white" borderRadius="15px">
                        <h5 style={{ paddingLeft: "1.5rem", fontSize: "1.1rem", paddingTop: "1rem", fontFamily: "poppinsmed" }}>User Overview</h5>
                        <div id="container" style={{ height: '80%', width: "100%", margin: "auto", marginBottom: "0", marginTop: "5px" }}></div>
                    </Flex>
           </Flex>
    </div>
    </Box>
      </div>
  );
}
