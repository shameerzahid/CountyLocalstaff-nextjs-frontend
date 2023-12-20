import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, Icon } from "@chakra-ui/react";
import { useToken } from '@chakra-ui/react'
import {  Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, Heading, Input, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import AdminAddUserForm from "../components/AdminAddUserForm"
import { useState } from "react";
import '../styles/styles.css'
export default function UserTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Dummy data for illustration purposes
  const users = [
    {
      id: 1,
      name: "John Doe doeee",
      username: "AdminTest Admin",
      email: "john@example.com",
      role: "super admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jan Doe",
      username: "jan_doe",
      email: "jane@example.com",
      role: "admin",
      status: "Inactive",
    },
    {
        id: 3,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "user",
        status: "Active",
      },
      {
        id: 88,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "super admin",
        status: "Active",
      },
      {
        id: 4,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "super admin",
        status: "Active",
      },
      {
        id: 5,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "super admin",
        status: "Active",
      },
      {
        id: 6,
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
        role: "super admin",
        status: "Active",
      },
    // Add more users as needed
  ];

  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken('colors', '#F6F6F6')
  const [selectedUser, setSelectedUser] = useState("")
  const handleEdit = (user) => {
    setSelectedUser(user)
    onOpen();
  }
  return (
    <div style={{  overflow: "hidden", height: "70vh", backgroundColor: "white", borderRadius:"20px", margin: "25px 0 0 0", paddingLeft: "20px", border: "1px solid #ccc", paddingRight: "20px" }}>
    <div className="tablecontainer" style={{  height: "52px", overflowY: "hidden", backgroundColor: "white" }}>
      <Table className="table" style={{borderCollapse:"separate", borderSpacing:"0 0.4em"}} variant="striped"  size="md"  bg="white" >
        <Thead backgroundColor="white"         >
          <Tr   style={{height: "52px"}} >
            <Th style={{borderBottom:"none", padding:"0px 16px", fontSize: "14px", fontFamily:"poppinsreg", width: "20%"}}>User</Th>
            <Th style={{borderBottom:"none", padding:"0px 16px", width: "30%", fontFamily:"poppinsreg" }} fontSize="14px">Email</Th>
            <Th style={{borderBottom:"none", padding:"0px 16px", width: "15%", fontFamily:"poppinsreg"  }} fontSize="14px">Role</Th>
            <Th style={{borderBottom:"none", padding:"0px 16px",width: "15%", fontFamily:"poppinsreg"  }} fontSize="14px">Status</Th>
            <Th style={{borderBottom:"none", padding:"0px 16px", width: "20%", fontFamily:"poppinsreg"  }} fontSize="14px">Action</Th>
          </Tr>
        </Thead> </Table> </div>
        <div className="tablecontainer" style={{  height: "60vh", overflowY: "auto", backgroundColor: "white" }}>
        <Table className="table"  style={{borderCollapse:"separate", borderSpacing:"0 0.6em"}} variant="striped"  size="md"  bg="white" height={`${numRows * rowHeight}vh`}>
        <Tbody>
          {users.slice(0, numRows).map((user,index) => (
            <Tr  key={user.id} style={{ height: "52px", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius:"6px"}}>
              <Td  bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 16px", borderTop: "0.1px solid  #ccc", color: "#2A2A2A", width: "20%",fontFamily:"poppinsreg", fontSize: '0.875rem'}}  >{user.username}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 16px", borderTop: "0.1px  solid #ccc", color: "#2A2A2A", width: "30%",fontFamily:"poppinsreg",fontSize: '0.875rem'}}>{user.email}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 16px", borderTop: "0.1px  solid #ccc", color: "#2A2A2A", width:"15%",fontFamily:"poppinsreg", fontSize: '0.875rem'}}>{user.role}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 16px", borderTop: "0.1px  solid #ccc", color: "#2A2A2A", width:"15%",fontFamily:"poppinsreg", fontSize: '0.875rem'}}>{user.status}</Td>
              <Td bg={index % 2 === 0 ? `${bg + '!important'}`  : "white"}   style={{padding:"5px 16px", borderTop: "0.1px  solid #ccc", width: "20%"}}>
             <Flex alignItems="center"> <Button fontFamily="lato700" fontSize="15px" height="27px" onClick={() => handleEdit(user)} border="1px solid #03AF9F" bg='transparent' color="#03AF9F"  _hover={{ bg: '#03AF9F', color: "white" }} size="lg">
              Edit
            </Button>
            <Icon marginLeft="10px" bg="transparent" fontSize="20px" className="ellipsis" as={HiOutlineEllipsisVertical}/>
              </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AdminAddUserForm  isOpen={isOpen} onClose={onClose} id={selectedUser.id} name={selectedUser.name} username={selectedUser.username} email={selectedUser.email} role={selectedUser.role} edit={true} />
    </div> </div>
  );
}