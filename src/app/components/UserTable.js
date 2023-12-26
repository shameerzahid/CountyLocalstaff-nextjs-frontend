"use client"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Icon,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { useToken } from "@chakra-ui/react";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import AdminAddUserForm from "../components/AdminAddUserForm";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import "../styles/styles.css";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import UserEndPoint from '../constants/apiruls'

export default function UserTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = useSelector(selectToken);
  const [users, setUsers] = useState([])

  // Dummy data for illustration purposes
  

  const rowHeight = 3; // Set the desired height for each row in vh
  const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken("colors", "#F6F6F6");
  const [selectedUser, setSelectedUser] = useState("");
  const handleEdit = (user) => {
    setSelectedUser(user);
    console.log(selectedUser)
    onOpen();
  };
  const Drawer = {
    sizes: {
      menu: {
        dialog: { maxWidth: "31%" },
      },
    },
  };
  const customTheme = extendTheme({
    components: {
      Drawer,
    },
  });

  useEffect(() => {
    const getAllUsers =async () => {
      try {
            
        const data =  await fetch(`${UserEndPoint}`,{
          method : "GET",
          headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const Users = await data.json()
        setUsers(Users)
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
     
  }, [])
  return (
    <div
      style={{
        overflow: "hidden",
        height: "70vh",
        backgroundColor: "white",
        borderRadius: "20px",
        margin: "25px 0 0 0",
        paddingLeft: "20px",
        border: "1px solid #ccc",
        paddingRight: "20px",
      }}
    >
      <div
        className="tablecontainer"
        style={{
          height: "52px",
          overflowY: "hidden",
          backgroundColor: "white",
        }}
      >
        <Table
          className="table"
          style={{ borderCollapse: "separate", borderSpacing: "0 0.4em" }}
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
                  fontSize: "14px",
                  fontFamily: "poppinsreg",
                  width: "20%",
                }}
              >
                User
              </Th>
              <Th
                style={{
                  borderBottom: "none",
                  padding: "0px 16px",
                  width: "30%",
                  fontFamily: "poppinsreg",
                }}
                fontSize="14px"
              >
                Email
              </Th>
              <Th
                style={{
                  borderBottom: "none",
                  padding: "0px 16px",
                  width: "15%",
                  fontFamily: "poppinsreg",
                }}
                fontSize="14px"
              >
                Role
              </Th>
              <Th
                style={{
                  borderBottom: "none",
                  padding: "0px 16px",
                  width: "15%",
                  fontFamily: "poppinsreg",
                }}
                fontSize="14px"
              >
                Status
              </Th>
              <Th
                style={{
                  borderBottom: "none",
                  padding: "0px 16px",
                  width: "20%",
                  fontFamily: "poppinsreg",
                }}
                fontSize="14px"
              >
                Action
              </Th>
            </Tr>
          </Thead>{" "}
        </Table>{" "}
      </div>
      <div
        className="tablecontainer"
        style={{ height: "60vh", overflowY: "auto", backgroundColor: "white" }}
      >
        <Table
          className="table"
          style={{ borderCollapse: "separate", borderSpacing: "0 0.6em" }}
          variant="striped"
          size="md"
          bg="white"
          height={`${numRows * rowHeight}vh`}
        >
          <Tbody>
            {users.map((user, index) => (
              <Tr
                key={user.id}
                style={{
                  height: "52px",
                  boxShadow: "0px 4px 16px -4px rgba(0, 0, 0, 0.12)",
                  borderRadius: "6px",
                }}
              >
                <Td
                  bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                  style={{
                    padding: "5px 16px",
                    borderTop: "0.1px solid  #ccc",
                    color: "#2A2A2A",
                    width: "20%",
                    fontFamily: "poppinsreg",
                    fontSize: "0.875rem",
                  }}
                >
                  {user.firstName}{" "}{user.lastName}
                </Td>
                <Td
                  bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                  style={{
                    padding: "5px 16px",
                    borderTop: "0.1px  solid #ccc",
                    color: "#2A2A2A",
                    width: "30%",
                    fontFamily: "poppinsreg",
                    fontSize: "0.875rem",
                  }}
                >
                  {user.email}
                </Td>
                <Td
                  bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                  style={{
                    padding: "5px 16px",
                    borderTop: "0.1px  solid #ccc",
                    color: "#2A2A2A",
                    width: "15%",
                    fontFamily: "poppinsreg",
                    fontSize: "0.875rem",
                  }}
                >
                  { user.role === 1 ? "Super Admin" : user.role === 2 ? "Admin" : user.role === 3 ? "User" : ""
                  }
                </Td>
                <Td
                  bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                  style={{
                    padding: "5px 16px",
                    borderTop: "0.1px  solid #ccc",
                    color: "#2A2A2A",
                    width: "15%",
                    fontFamily: "poppinsreg",
                    fontSize: "0.875rem",
                  }}
                >
                  {user.status ? "Active" : "Freeze"}
                </Td>
                <Td
                  bg={index % 2 === 0 ? `${bg + "!important"}` : "white"}
                  style={{
                    padding: "5px 16px",
                    borderTop: "0.1px  solid #ccc",
                    width: "20%",
                  }}
                >
                  <Flex alignItems="center">
                    {" "}
                    <Button
                      fontFamily="lato700"
                      fontSize="15px"
                      height="27px"
                      onClick={() => handleEdit(user)}
                      border="1px solid #03AF9F"
                      bg="transparent"
                      color="#03AF9F"
                      _hover={{ bg: "#03AF9F", color: "white" }}
                      size="lg"
                    >
                      Edit
                    </Button>
                    <Menu placement="bottom-end" maxWidth="48px" className="">
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            as={IconButton}
                            _hover={{ bg: "none" }}
                            _active={{ background: "none" }}
                            aria-label="Options"
                            icon={<HiOutlineEllipsisVertical className="ellipsisIcon"/>}
                            bg="transparent"
                            fontSize="20px"
                          />
                          <MenuList
                            minWidth="150px"
                            style={{
                              backgroundColor: "#F4F9F6",
                              border:"1px solid #ccc",
                              borderRadius: "12px",
                            }}
                          >
                            <MenuItem
                              background={"#F4F9F6"}
                              pl={2}
                              style={{
                                borderRadius: "4px",
                                width: "130px",
                                margin: "0 10px",
                                fontFamily:"Poppins",
                                color:"black",
                                padding:"2px 8px"
                              }}
                              fontSize={"13px"}
                              _hover={{ background: "#03AF9F" }}
                            >
                              Freeze Account
                            </MenuItem>
                            <MenuItem
                              background={"#F4F9F6"}
                              style={{
                                borderRadius: "4px",
                                width: "130px",
                                margin: "0 10px",
                                fontFamily:"Poppins",
                                color:"black",
                                padding:"2px 8px"
                              }}
                              fontSize={"13px"}
                              pl={2}
                              _hover={{ background: "#03AF9F" }}
                            >
                              Reset Password
                            </MenuItem>
                            <MenuItem
                              background={"#F4F9F6"}
                              style={{
                                borderRadius: "4px",
                                width: "130px",
                                margin: "0 10px",
                                fontFamily:"Poppins",
                                color:"black",
                                padding:"2px 8px"
                              }}
                              pl={2}
                              fontSize={"13px"}
                              _hover={{ background: "#03AF9F" }}
                            >
                              Remove Account
                            </MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <ChakraProvider theme={customTheme}>
        <AdminAddUserForm
          isOpen={isOpen}
          onClose={onClose}
          user= {selectedUser}
          id={selectedUser.id}
          fName={selectedUser.firstName}
          lName={selectedUser.lastName}
          pemail={selectedUser.email}
          prole={selectedUser.role}
          edit={true}
          changepassword ={false}
        />
        </ChakraProvider>
      </div>{" "}
    </div>
  );
}
