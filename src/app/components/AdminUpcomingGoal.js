"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";import { useEffect} from "react";
export default function AdminUpcomingGoal() {

   
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
            <div>
                <Flex flexDirection="row" alignItems="center" width="650px" fontSize="16px" fontWeight="500" marginTop="22px" marginLeft="40px">
                    <Flex flexDirection="row" alignItems="center" width="560px">
                   <Flex  alignItems="center" width="250px"> <FaCalendarAlt color="#03AF9F" />
                    <Text marginLeft="5px">Upcoming Goal from</Text> </Flex>
                    <Text>date--- to date---</Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" width="250px" marginLeft="20px">
                   <Flex justifyContent="center" alignItems="center" width="200px"> 
                                       <GoGoal color="#03AF9F" />
                    <Text marginLeft="5px">Goal Number</Text> </Flex>
                    <Text>No</Text>
                    </Flex>  
                   
                </Flex>
                <Flex flexDirection="row" alignItems="center" width="650px" fontSize="16px" fontWeight="500" marginTop="22px" marginLeft="40px">
                    <Flex flexDirection="row" alignItems="center" width="560px">
                   <Flex  alignItems="center" width="250px"> <GiTrophyCup color="#03AF9F" />
                    <Text marginLeft="5px">Goal Reward</Text> </Flex>
                    <Text>date--- to date---</Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" width="250px" marginLeft="20px">
                   <Flex justifyContent="center" alignItems="center" width="200px"> 
                                       <GiStairsGoal color="#03AF9F" />
                    <Text marginLeft="5px">Bonus Goal</Text> </Flex>
                    <Text>No</Text>
                    </Flex>  
                   
                </Flex>
              <Flex flexDirection="row" justifyContent="space-between" marginTop="4vh" >
            <div className="tablecontainer" style={{ height: "59vh", width:"48vw", overflowY: "auto", backgroundColor: "white", borderRadius:"2.5vh", padding: "2vh", border:"1px solid #ccc" }}>
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
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px"}} >{user.name}</Td>
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px"}} >{user.lastupdated}</Td>
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px"}} >{user.progress}</Td>
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 30px"}} >
                      <Button  fontSize="16px" height="30px" border="1px solid #03AF9F" bg='white' color="#03AF9F"  _hover={{ bg: '#03AF9F', color: "white" }} size="lg">
                      Details
                    </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
             
            </div>
            </Flex>
            </div>
          );
        }
        