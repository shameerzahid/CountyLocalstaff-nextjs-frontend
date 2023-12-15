import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useToken } from '@chakra-ui/react'

export default function UserTable() {
  // Dummy data for illustration purposes
  const users = [
    {
      id: 1,
      name: "John Doe",
      username: "john_doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jan Doe",
      username: "jan_doe",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
    // Add more users as needed
  ];

  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken('colors', '#F6F6F6')
  return (
    <div style={{ height: "70vh", overflowY: "auto", backgroundColor: "white", borderRadius:"2.5vh", margin: "2.5vh 0 0 0", padding: "2vh" }}>
      <Table  style={{borderCollapse:"separate", borderSpacing:"0 1em"}} variant="striped"  size="md"  bg="white" height={`${numRows * rowHeight}vh`}>
        <Thead>
          <Tr >
            <Th style={{borderBottom:"none", padding:"0px 32px"}}fontSize="2vh">User</Th>
            <Th style={{borderBottom:"none", padding:"0px 32px"}} fontSize="2vh">Email</Th>
            <Th style={{borderBottom:"none", padding:"0px 32px"}} fontSize="2vh">Role</Th>
            <Th style={{borderBottom:"none", padding:"0px 32px"}} fontSize="2vh">Status</Th>
            <Th style={{borderBottom:"none", padding:"0px 32px"}} fontSize="2vh">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.slice(0, numRows).map((user,index) => (
            <Tr  key={user.id} style={{ height: `${rowHeight}vh`, boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)',padding:0, borderRadius:"6px"}}>
              <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"15px 30px"}}  >{user.username}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"15px 30px"}}>{user.email}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"15px 30px"}}>{user.role}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"15px 30px"}}>{user.status}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"15px 30px"}}>
              <Button border="1px solid #03AF9F" bg='white' color="#03AF9F"  _hover={{ bg: '#03AF9F', color: "white" }} size="lg">
              Edit
            </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}