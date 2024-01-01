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
  ChakraProvider,
  extendTheme,
  useToast,
  useToken
} from "@chakra-ui/react";
// import { useToken } from "@chakra-ui/react";
import {
  Flex,
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
} from "@chakra-ui/react";
import "../styles/styles.css";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import UserEndPoint from '../constants/apiruls'
import { selectRole } from "../redux/roleSlice";
import { useDispatch } from 'react-redux';
import { selectUserTable, setUsers } from '../redux/userTableSlice';
import { removeUser } from '../redux/userTableSlice';
export default function UserTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = useSelector(selectToken);
  const currentRole = useSelector(selectRole);
  const [status, setStatus] = useState(true)
  const toast = useToast()
  const dispatch = useDispatch()
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
  const getAllUsers = async () => {
    try {
      const data = await fetch(`${UserEndPoint}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const users = await data.json();
      dispatch(setUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
  const { users } = useSelector(selectUserTable);
  useEffect(() => {

    getAllUsers()
    console.log("All Users", users)

  }, [users])

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  const freezeToggle = async (id, newStatus) => {
    try {
      // Immediately update the local state
      setStatus((prevStatus) => !prevStatus);
      const data = await fetch(`${UserEndPoint}/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: !newStatus,
        }),
      });

      const res = await data.json();
      const status = await data.status;
      console.log(res, status);
      if (status === 200) {
        getAllUsers()
        // Use the updated state directly here
        toast({
          title: 'Success status updated',
          position: "bottom-right",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        // Use the updated state directly here
        toast({
          title: 'Invalid',
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Use the updated state directly here
      toast({
        title: error.message || 'Error updating status',
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const ResetPassword = async (id, status) => {
    try {
      const data = await fetch(`${UserEndPoint}/reset-password/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      const status = await data.status;
      console.log(res, status);

      if (status === 200) {
        // Use the updated state directly here
        toast({
          title: 'Password updated',
          position: "bottom-right",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        // Use the updated state directly here
        toast({
          title: 'Invalid',
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Use the updated state directly here
      toast({
        title: error.message || 'Error updating status',
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }
  const RemoveAccount = async (id) => {
  
    try {
      const data = await fetch(`${UserEndPoint}/soft-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const status = data.status;
  
      if (status === 200) {
        // Remove the user from the Redux store
        dispatch(removeUser(id));
  
        toast({
          title: 'Account Removed',
          position: "bottom-right",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        const error = await data.json();
  
        toast({
          title: error.message,
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message || 'Error updating status',
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
                  {user.role === 1 ? "Super Admin" : user.role === 2 ? "Admin" : user.role === 3 ? "User" : ""
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
                    {
                      currentRole < user.role ? (
                        <>
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
                          <Menu def placement="bottom-end" maxWidth="48px" className="">
                            {({ isOpen }) => (
                              <>
                                <MenuButton
                                  as={IconButton}
                                  _hover={{ bg: "none" }}
                                  _active={{ background: "none" }}
                                  aria-label="Options"
                                  icon={<HiOutlineEllipsisVertical className="ellipsisIcon" />}
                                  bg="transparent"
                                  fontSize="20px"
                                />
                                <MenuList
                                  minWidth="150px"
                                  style={{
                                    backgroundColor: "#F4F9F6",
                                    border: "1px solid #ccc",
                                    borderRadius: "12px",
                                  }}
                                >
                                  <MenuItem
                                    background="#F4F9F6"
                                    pl={2}
                                    style={{
                                      borderRadius: "4px",
                                      width: "130px",
                                      margin: "0 10px",
                                      fontFamily: "Poppins",
                                      color: "black",
                                      padding: "2px 8px",
                                    }}
                                    fontSize="13px"
                                    _hover={{ background: "#03AF9F" }}
                                    onClick={() => freezeToggle(user._id, user.status)}
                                  >
                                    {user.status ? "Freeze Account" : "Activate Account"}
                                  </MenuItem>
                                  <MenuItem
                                    background="#F4F9F6"
                                    style={{
                                      borderRadius: "4px",
                                      width: "130px",
                                      margin: "0 10px",
                                      fontFamily: "Poppins",
                                      color: "black",
                                      padding: "2px 8px",
                                    }}
                                    fontSize="13px"
                                    pl={2}
                                    _hover={{ background: "#03AF9F" }}
                                    onClick={() => ResetPassword(user._id, user.status)}
                                  >
                                    Reset Password
                                  </MenuItem>
                                  <MenuItem
                                    background="#F4F9F6"
                                    style={{
                                      borderRadius: "4px",
                                      width: "130px",
                                      margin: "0 10px",
                                      fontFamily: "Poppins",
                                      color: "black",
                                      padding: "2px 8px",
                                    }}
                                    pl={2}
                                    fontSize="13px"
                                    _hover={{ background: "#03AF9F" }}
                                    onClick={() => RemoveAccount(user._id)}
                                  >
                                    Remove Account
                                  </MenuItem>
                                </MenuList>
                              </>
                            )}
                          </Menu>
                        </>
                      ) : (
                        " "
                      )}
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
            user={selectedUser}
            id={selectedUser._id}
            fName={selectedUser.firstName}
            lName={selectedUser.lastName}
            pemail={selectedUser.email}
            prole={selectedUser.role}
            edit={true}
            changepassword={false}
            getUpdatedUsers={() => getAllUsers()}
            getNewUsers={() => getAllUsers()}
          />
        </ChakraProvider>
      </div>{" "}
    </div>
  );
}
