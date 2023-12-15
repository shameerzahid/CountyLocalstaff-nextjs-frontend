import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
export default function AdminUpcomingGoal() {
        const users = [
            {
              id: 1,
              name: "John Doe",
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
        
          return (
            <div>
                <Flex flexDirection="row" alignItems="center" width="40vw" justifyContent="space-between" fontSize="2.5vh" fontWeight="500" marginTop="3vh" marginLeft="4vw">
                    <Flex flexDirection="row" alignItems="center" justifyContent="center">
                    <FaCalendarAlt color="#03AF9F" />
                    <Text marginLeft="0.5vw" marginRight="2vw">Upcoming Goal from</Text>
                    <Text>date to date</Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" justifyContent="center">
                    <GoGoal color="#03AF9F" />
                    <Text marginLeft="0.5vw" marginRight="2vw">Goal Number</Text>
                    <Text>No</Text>
                    </Flex>
                   
                </Flex>
                <Flex flexDirection="row" alignItems="center" width="40vw" justifyContent="space-between" fontSize="2.5vh" fontWeight="500" marginTop="3vh" marginLeft="4vw">
                <Flex flexDirection="row" alignItems="center" justifyContent="center">
                    <GiTrophyCup color="#03AF9F" />
                    <Text marginLeft="0.5vw" marginRight="2vw">Goal Reward</Text>
                    <Text>This is text</Text>
                    </Flex>
                    <Flex flexDirection="row" alignItems="center" justifyContent="center">
                    <GiStairsGoal color="#03AF9F" />
                    <Text marginLeft="0.5vw" marginRight="2vw">Bonus Goal</Text>
                    <Text>No</Text>
                    </Flex>
                </Flex>
                
              
            <div style={{ height: "56vh",width: "50vw", overflowY: "auto", backgroundColor: "white", borderRadius:"2.5vh", margin: "2.5vh 0 0 4vw", padding: "1.5vh" }}>
              <Table variant="striped" colorScheme="gray" size="md" borderRadius="2.5vh" bg="white" height={`${numRows * rowHeight}vh`}>
                <Thead>
                  <Tr >
                    <Th>Users</Th>
                    <Th>Last Updated</Th>
                    <Th>progress</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.slice(0, numRows).map((user) => (
                    <Tr key={user.id} style={{ height: `${rowHeight}vh`, marginBottom: "1vh" }}>
                      <Td bg="white">{user.name}</Td>
                      <Td bg="white">{user.lastupdated}</Td>
                      <Td bg="white">{user.progress}</Td>
                      <Td bg="white">
                      <Button border="1px solid #03AF9F" bg='white' color="#03AF9F"  _hover={{ bg: '#03AF9F', color: "white" }} size="lg">
                      Details
                    </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div></div>
          );
        }
        