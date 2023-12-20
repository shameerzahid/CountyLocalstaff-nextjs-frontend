"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useDisclosure } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
import anychart from 'anychart';
import { useEffect, useRef,useState } from "react";
export default function AdminCurrentGoal() {

  const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        anychart.onDocumentReady(function () {

            // create data
            var data = [
              {x: "Completed", value: 1},
              {x: "Bonus", value: 2},
              {x: "Incomplete", value: 3},
            ];
        
            // create a chart and set the data
            var chart = anychart.pie(data);
        
            // set the chart title
            chart.title("Team Overview");
        
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
              name: "John Do22",
              lastupdated: "john_doe",
              progress: "john@example.com",
            },
            {
              id: 2,
              name: "John Doe",
              lastupdated: "john_doe",
              progress: "john@example.com",
            },
              {
                id: 1,
                name: "John Doe",
                lastupdated: "john_doe",
                progress: "john@example.com",
              },
             
            // Add more users as needed
          ];
        
          const rowHeight = 3; // Set the desired height for each row in vh
          const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
          const bg = useToken('colors', '#F6F6F6')
          return (
            <div style={{padding: "0 2.5rem", marginTop: "1.5rem"}}>
              <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" paddingLeft="15px" paddingRight="15px" >
              <FaCalendarAlt style={{marginLeft: '0.25rem'}} color="#03AF9F" />
              <Text marginLeft="0.5rem">Active Goal from</Text>
              <Text width="14rem" marginLeft="1.5rem">12-20-2023 to 12-22-2023</Text>
              <GoGoal style={{marginLeft: "3rem"}} color="#03AF9F" />
              <Text marginLeft="0.5rem">Goal Number</Text>
              <Text marginLeft="1.5rem">10</Text>
              </Flex>
              <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="1rem" paddingLeft="15px" paddingRight="15px" >
              <GiTrophyCup style={{marginLeft: '0.25rem'}} color="#03AF9F" />
                    <Text marginLeft="0.5rem">Goal Reward</Text>
              <Text width="14rem" marginLeft="3.5rem">Anything</Text>
              <GiStairsGoal style={{marginLeft: "2.8rem"}}  color="#03AF9F" />
              <Text marginLeft="0.5rem">Bonus Goal</Text>
              <Text marginLeft="2.4rem">10</Text>
              </Flex>
              {/* <Flex flexDirection="row" justifyContent="space-between" width="65vw"> */}
                {/* <Flex flexDirection="row" alignItems="center" width="650px" fontSize="16px" fontWeight="500" marginTop="22px" marginLeft="40px">
                    <Flex flexDirection="row" alignItems="center" width="560px">
                   <Flex  alignItems="center" width="250px"> <FaCalendarAlt color="#03AF9F" />
                    <Text marginLeft="5px">Active Goal from</Text> </Flex>
                    <Text>12-20-2023 to 12-22-2023</Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" width="250px" marginLeft="20px">
                   <Flex justifyContent="center" alignItems="center" width="200px"> 
                                       <GoGoal color="#03AF9F" />
                    <Text marginLeft="5px">Goal Number</Text> </Flex>
                    <Text>10</Text>
                    </Flex>  
                    

                </Flex> */}
                {/* <Text  margin="20px 20px auto auto" paddingTop="5px" color="#03AF9F" backgroundColor="#03af9e18" borderRadius="20px" fontWeight="500" height="36px" width="70px" textAlign="center">Repeat</Text> </Flex>
                <Flex flexDirection="row" alignItems="center" width="650px" fontSize="16px" fontWeight="500" marginTop="22px" marginLeft="40px">
                    <Flex flexDirection="row" alignItems="center" width="560px">
                   <Flex  alignItems="center" width="250px"> <GiTrophyCup color="#03AF9F" />
                    <Text marginLeft="5px">Goal Reward</Text> </Flex>
                    <Text>anything</Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" width="250px" marginLeft="20px">
                   <Flex justifyContent="center" alignItems="center" width="200px"> 
                                       <GiStairsGoal color="#03AF9F" />
                    <Text marginLeft="5px">Bonus Goal</Text> </Flex>
                    <Text>10</Text>
                    </Flex>  
                   
                </Flex> */}
              <Flex flexDirection="row" justifyContent="space-between" marginTop="1rem" >
            <div className="tablecontainer" style={{ height: "59vh", width:"43.5vw", overflowY: "auto", backgroundColor: "white", borderRadius:"2.5vh", padding: "2vh", border:"1px solid #ccc" }}>
              <Table className="table"  style={{borderCollapse:"separate", borderSpacing:"0 1em"}} variant="striped"  size="md"  bg="white" height={`${numRows * rowHeight}vh`}>
                <Thead>
                  <Tr >
                    <Th style={{borderBottom:"none", padding:"0px 32px"}} fontSize="15px" >Users</Th>
                    <Th style={{borderBottom:"none", padding:"0px 32px"}}fontSize="15px">Last Updated</Th>
                    <Th style={{borderBottom:"none", padding:"0px 32px"}}fontSize="15px">progress</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.slice(0, numRows).map((user,index) => (
                    <Tr key={user.id} style={{ height: "45px", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius:"6px"}}>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px", borderTop: "0.1px solid  #ccc"}} >{user.name}</Td>
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px", borderTop: "0.1px solid  #ccc"}} >{user.lastupdated}</Td>
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px", borderTop: "0.1px solid  #ccc"}} >{user.progress}</Td>
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px", borderTop: "0.1px solid  #ccc"}} >
                      <Button  fontSize="15px" height="35px" border="1px solid #03AF9F" bg='transparent' color="#03AF9F"  _hover={{ bg: '#03AF9F', color: "white" }}>
                      Details
                    </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
             
            </div>
            <Flex flexDirection="column" height="59vh" width="22vw"  backgroundColor="white" borderRadius="15px" border="1px solid #ccc">
            <div id="container" style={{ height: '45vh', margin: "auto", marginBottom: "0", marginTop: "5px"}}></div>
            <Flex flexDirection="row" justifyContent="center" alignItems="center" marginTop="15px">
            <Button fontSize="15px" height="40px" width="43%" border="1px solid #03AF9F" marginRight="2vw" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
              Edit Goal
            </Button>
            <Button fontSize="15px" height="40px" width="43%" bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }}>
              End Goal
            </Button>   </Flex>
            </Flex>
              </Flex>
            </div>
          );
        }
        