"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  extendTheme,
  ChakraProvider,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../styles/styles.css";
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import { selectUserId } from '../redux/userIdSlice';
import AdminAddUserForm from "./AdminAddUserForm";
import UserEndPoint from '../constants/apiruls'
import { useDispatch } from 'react-redux';
import { selectUser, setFirstName, setLastName, setEmail } from '../redux/userDetailsSlice';
export default function Details() {
//   const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [email, setEmail] = useState("");
const token = useSelector(selectToken);
const userId = useSelector(selectUserId);
const toast = useToast()
const dispatch = useDispatch()
const { isOpen, onOpen, onClose } = useDisclosure();
const UserDetails = async () => {
  try {
    const data = await fetch(`${UserEndPoint}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();

    // Update Redux state
    dispatch(setFirstName(res.firstName));
    dispatch(setLastName(res.lastName));
    dispatch(setEmail(res.email));

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
const { firstName, lastName, email } = useSelector(selectUser);
  useEffect(() => {
   UserDetails()
  }, [])

  const ChangePassword = () => {
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

  const updateUser = async() => {
    try {
      const data = await fetch(`${UserEndPoint}/${userId}`,{
        method : "PUT",
        headers: {
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
        },
        body : JSON.stringify( {
          firstName,
          lastName,
          email,
        })
      })
      const res = await data.json();
      const status = await data.status;
      dispatch(setFirstName(res.firstName));
      dispatch(setLastName(res.lastName));
      dispatch(setEmail(res.email));
      console.log(res, status)
      if(status == 200)
      {
        UserDetails()
        toast({
          title: 'Success',
          position: "bottom-right",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
      else
      {
        toast({
          title: 'Invalid',
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        }) 
      }
    } catch (error) {
      toast({
        title: error,
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
  }}
  return (
    <>
      <Box
        margin="2rem 20px 0 0"
        bg="white"
        className="lg:w-[448px] lg:h-[415px] w-full "
        padding="24px"
        borderRadius="18px"
        border="1px solid #ccc"
      >
        {/* <Heading fontSize="2xl" mb="4">User Details</Heading> */}
        <form>
          <Stack spacing={4}>
            <FormControl id="firstName">
              <FormLabel fontSize="0.8rem" fontFamily="poppinsmed">
                First Name
              </FormLabel>
              <Input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First Name"
                fontFamily="poppinsmed"
                onChange={(e) => dispatch(setFirstName(e.target.value))}
                height="49px"
                borderColor="#CBCBCB"
                _focus={{
                  boxShadow: "0 0 10px #03AF9F",
                }}
              />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel fontSize="0.8rem" fontFamily="poppinsmed">
                Last Name
              </FormLabel>
              <Input
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) =>  dispatch(setLastName(e.target.value))}
                fontFamily="poppinsmed"
                height="45px"
                borderColor="#CBCBCB"
                _focus={{
                  boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                }}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel fontSize="0.8rem" fontFamily="poppinsmed">
                Email
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                placeholder="Example@gmail.com"
                onChange={(e) => dispatch(setEmail(e.target.value))}
                fontFamily="poppinsmed"
                borderColor="#CBCBCB"
                height="45px"
                _focus={{
                  boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                }}
              />
            </FormControl>
            <Button
              border="1px solid #03AF9F"
              fontFamily="lato700"
              bg="white"
              color="#03AF9F"
              height="42px"
              _hover={{ bg: "#03AF9F", color: "white" }}
              size="lg"
              onClick={ChangePassword}
            >
              Change Password
            </Button>
            <Button
              bg="#03AF9F"
              color="white"
              fontFamily="lato700"
              height="42px"
              _hover={{ bg: "#0d7a79" }}
              size="lg"
              onClick={updateUser}
            >
              Update
            </Button>
          </Stack>
          <ChakraProvider theme={customTheme}>
        <AdminAddUserForm
          isOpen={isOpen}
          onClose={onClose}
          changepassword ={true}
        />
        </ChakraProvider>
        </form>
      </Box>
    </>
  );
}
