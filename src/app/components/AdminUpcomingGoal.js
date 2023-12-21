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
             goalNo: 10
            },
            {
              id: 2,
              name: "John Doe",
              goalNo: 10

            },
              {
                id: 1,
                name: "John Doe",
                goalNo: 10

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
              <Text marginLeft="0.5rem">upcoming goal from</Text>
              <Text width="14rem" marginLeft="1.5rem">12-20-2023 to 12-22-2023</Text>
              <GoGoal style={{marginLeft: "3rem"}} color="#03AF9F" />
              <Text marginLeft="0.5rem">Goal Number</Text>
              <Text marginLeft="1.5rem">10</Text>
              <Text marginLeft="3rem" paddingTop="5px" color="#03AF9F" backgroundColor="#03af9e18" borderRadius="20px" fontWeight="500" height="36px" width="70px" textAlign="center">Repeat</Text>
              </Flex>
              <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="1rem" paddingLeft="15px" paddingRight="15px" >
              <GiTrophyCup style={{marginLeft: '0.25rem'}} color="#03AF9F" />
                    <Text marginLeft="0.5rem">Goal Reward</Text>
              <Text width="14rem" marginLeft="5rem">Anything</Text>
              <GiStairsGoal style={{marginLeft: "2.8rem"}}  color="#03AF9F" />
              <Text marginLeft="0.5rem">Bonus Goal</Text>
              <Text marginLeft="2.4rem">10</Text>
             
              </Flex>
              <Flex flexDirection="row" justifyContent="flex-end" alignItems="center" marginTop="-35px" marginRight="-45px">
            <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="90px" border="1px solid #03AF9F" marginRight="10px" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
              Edit Goal
            </Button>
            <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="90px" bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }}>
              End Goal
            </Button>   </Flex>
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
              <div style={{  overflow: "hidden", height: "59vh", width: "66.5%", backgroundColor: "white", borderRadius:"20px", margin: "0 0 0 0", paddingLeft: "20px", border: "1px solid #ccc", paddingRight: "20px" }}>
    <div className="tablecontainer" style={{  height: "59px", width: "100%", overflowY: "hidden", backgroundColor: "white" }}>        
        <Table className="table" style={{borderCollapse:"separate", borderSpacing:"0 1.2em"}} variant="striped"  size="md"  bg="white" >
        <Thead backgroundColor="white"         >
          <Tr  style={{height: "52px"}} >
                    <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "0.875rem", fontFamily:"poppinsreg",color: "#0B393E", width: "50%"}} >Users</Th>
                    {/* <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "0.875rem", fontFamily:"poppinsreg",color: "#0B393E", width: "20%"}}>Last Updated</Th> */}
                    <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "0.875rem",textAlign : "center", fontFamily:"poppinsreg",color: "#0B393E", width: "50%"}}>Goal No</Th>
                    {/* <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "0.875rem", fontFamily:"poppinsreg",color: "#0B393E", width: "15%"}}></Th> */}
                  </Tr>
                </Thead> </Table></div>
                <div className="tablecontainer" style={{  height: "60vh", overflowY: "auto", backgroundColor: "white" }}>
        <Table className="table"  style={{borderCollapse:"separate", width: "100%", borderSpacing:"0 0.6em"}} variant="striped"  size="md"  bg="white" height={`${numRows * rowHeight}vh`}>
                <Tbody>
                  {users.slice(0, numRows).map((user,index) => (
                    <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius:"6px"}}>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"0 16px", borderTop: "0.1px solid  #ccc", width: "50%",fontFamily:"poppinsreg", fontSize: "14px"}} >{user.name}</Td>
                      {/* <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"0 16px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily:"poppinsreg", fontSize: "14px"}} >{user.lastupdated}</Td> */}
                      <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"0 16px", borderTop: "0.1px solid  #ccc", width: "50%", fontFamily:"poppinsreg", fontSize: "14px", textAlign : "center"}} >{user.goalNo}</Td>
                      {/* <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"0 16px", borderTop: "0.1px solid  #ccc", width: "15%"}} >
                      <Button  fontSize="16px" fontFamily="poppinsmed" height="38px" border="1px solid #03AF9F" borderRadius="0.25rem" lineHeight="24px" fontWeight="400" bg='transparent' color="#03AF9F"  _hover={{ bg: '#03AF9F', color: "white" }}>
                      Details
                    </Button>
                      </Td> */}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
             
            </div> </div> </Flex>
            </div>
          );
        }
        