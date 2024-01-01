"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
  Heading,
  Input,
  Select,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "../styles/styles.css";
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import { selectUserId } from "../redux/userIdSlice";
import UserEndPoint from '../constants/apiruls'
import { useDispatch } from 'react-redux'
import { setUsers } from '../redux/userTableSlice';
// import { useRef } from "react";
export default function AdminAddUserForm({
  isOpen,
  onClose,
  fName,
  lName,
  pemail,
  prole,
  edit,
  id,
  changepassword,
  getUpdatedUsers,
  getNewUsers
}) {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Set selectedOption based on the initial value of 'role' when 'role' changes
    switch (prole) {
      case 1:
        setSelectedOption('Super Admin');
        break;
      case 2:
        setSelectedOption('Admin');
        break;
      case 3:
        setSelectedOption('User');
        break;
      default:
        setSelectedOption('');
        break;
    }
  }, [prole]); 
 
  const [isOpenn, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(fName);
  const [lastName, setLastName] = useState(lName);
  const [email, setEmail] = useState(pemail);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(prole);
  
  const toast = useToast()
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
const [oldPassword, setOldPassword] = useState("")
const [newPassword, setNewPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const dispatch = useDispatch()


  useEffect(() => {
    setFirstName(fName || "");
    setLastName(lName || "");
    setEmail(pemail || "");
    setRole(prole || 0)
  }, [fName, lName, pemail]);
//  console.log(firstName, lastName, email, role)  
  const SaveUser = (e) => {
    if (id) 
    UpdateUser(e);
    else 
    AddUser(e);
  };
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const style = {
    background: isHovered ? "green " : "yellow",
    // Add other styles as needed
  };
  const optionnns = [
    "Super Admin",
    "Admin",
    "User",
  ];



  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option == "Super Admin")
      setRole(1)
    else if (option == "Admin")
      setRole(2)
    else if (option == "User")
      setRole(3)
    setIsOpen(false);
  };
  const UpdateUser = async () => {
    try {
      const data = await fetch(`${UserEndPoint}/${id}`,{
        method : "PUT",
        headers: {
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
        },
        body : JSON.stringify( {
          firstName,
          lastName,
          email,
          role
        })
      })
      const res = await data.json();
      const status = await data.status;
      setFirstName(res.firstName)
      setLastName(res.lastName)
      setEmail(res.email)
      console.log(res, status)
      if(status == 200)
      {
        getUpdatedUsers()
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
  }
  };
  const AddUser = async (e) => {
    // e.preventDefault();
    if (!firstName || !lastName || !email || !password || !role) {
      toast({
        title: 'Fill all the fields',
        description: "field is empty",
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    try {
      const data = await fetch(`${UserEndPoint}/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role
        })
      })
      const res = await data.json();
      const status = await data.status;
      console.log(res, status)
      
      if (status == 201) {
        dispatch(setUsers({
          firstName,
          lastName,
          email,
          password,
          role,
        }));
        onClose()
        toast({
          title: 'User Created',
          description: "Success",
          position: "bottom-right",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: 'Invalid Signup',
          description: " error",
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: error.message ,
        description: error.message,
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  };

  const changepass = async() => {
    if(!oldPassword || !newPassword || !confirmPassword)
    {
      console.log("fill fields")
    }
    try {
      const data = await fetch(`${UserEndPoint}/change-password/${userId}`,{
        method : "PUT",
        headers: {
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
        },
        body : JSON.stringify( {
          oldPassword,
          newPassword,
          confirmPassword
        })
      })
      const res = await data.json();
      const status = await data.status;
      if(status == 200)
      {
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
  }
  }
  return (
    <div>
      <Drawer
        size="menu"
        isOpen={isOpen}
        placement="right"
        // initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          style={{
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
            paddingTop: "1.5rem",
          }}
        >
          <DrawerCloseButton style={{ marginTop: "2rem" }} />
          <DrawerHeader fontFamily="lato700" fontSize="1.4rem">
           {id ? "Edit User": "Add User"} 
          </DrawerHeader>
          <DrawerBody marginBottom="3vh" className="drawercontainer">
            {
              changepassword ?
              <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username" fontFamily="poppinsreg">
                  Old Password
                </FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  height="50px"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  style={{ border: "1px solid #979797", borderRadius: "10px" }}
                  fontFamily="poppinsreg"
                  placeholder="Enter Your Old Password"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username" fontFamily="poppinsreg">
                  New Password
                </FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  fontFamily="poppinsreg"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter Your New Password"
                  style={{ border: "1px solid #979797", borderRadius: "10px" }}
                  height="50px"
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username" fontFamily="poppinsreg">
                  Confirm Password
                </FormLabel>
                <Input
                  type="text"
                  name="Email"
                  fontFamily="poppinsreg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Your New Password"
                  height="50px"
                  style={{ border: "1px solid #979797", borderRadius: "10px" }}
                  _focus={{
                    boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
                  }}
                />
              </Box>
             
              {/* <Box> */}
              <Button
              
              bg="#03AF9F"
                color="white"
                _hover={{ bg: "#0D7A79" }}
                size="lg"
                onClick={changepass}
              >
                Change
              </Button>
            </Stack> : 
 <Stack spacing="24px">
 <Box>
   <FormLabel htmlFor="username" fontFamily="poppinsreg">
     First Name
   </FormLabel>
   <Input
     type="text"
     name="firstName"
     height="50px"
     style={{ border: "1px solid #979797", borderRadius: "10px" }}
     fontFamily="poppinsreg"
     value={firstName}
     onChange={(e) => setFirstName(e.target.value)}
     placeholder="Enter First Name"
     _focus={{
       boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
     }}
   />
 </Box>
 <Box>
   <FormLabel htmlFor="username" fontFamily="poppinsreg">
     Last Name
   </FormLabel>
   <Input
     type="text"
     name="lastName"
     value={lastName}
     onChange={(e) => setLastName(e.target.value)}
     fontFamily="poppinsreg"
     placeholder="Enter last Name"
     style={{ border: "1px solid #979797", borderRadius: "10px" }}
     height="50px"
     _focus={{
       boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
     }}
   />
 </Box>
 <Box>
   <FormLabel htmlFor="username" fontFamily="poppinsreg">
     Email
   </FormLabel>
   <Input
     type="text"
     name="Email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     fontFamily="poppinsreg"
     placeholder="Enter Email"
     height="50px"
     style={{ border: "1px solid #979797", borderRadius: "10px" }}
     _focus={{
       boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
     }}
   />
 </Box>
 {!edit && (
   <Box>
     <FormLabel htmlFor="username" fontFamily="poppinsreg">
       Password
     </FormLabel>
     <Input
       type="password"
       name="Password"
       placeholder="Enter Password"
       fontFamily="poppinsreg"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       height="50px"
       style={{
         border: "1px solid #979797",
         borderRadius: "10px",
       }}
       _focus={{
         boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
       }}
     />
   </Box>
 )}
 <Box>
   <FormLabel htmlFor="owner" fontFamily="poppinsreg">
     Role
   </FormLabel>
   {/* <Select
     id="owner"
     defaultValue={role}
     appearance={"none"}
     fontFamily="poppinsreg"
     style={{
       border: "1px solid #979797",
       borderRadius: "10px",
     }}
     height="50px"
     focusBorderColor="#0D7A79" // Set the desired color for the border on focus
     focusBorderWidth="2px" // Set the desired border width on focus
   >
     <option value={0} disabled>
       Select Role
     </option>
     <option value={1}>Super Admin</option>
     <option value={2}>Admin</option>
     <option value={3}>User</option>
   </Select> */}
   <Box
     position="relative"
   >
     <Text
       onClick={() => setIsOpen(!isOpenn)}
       cursor="pointer"
       fontFamily="poppinsreg"
       // padding={2}
       placeholder="Select User Type"
       className="text-selected"
       style={{
         border: "1px solid #979797",
         height: "50px",
         display: "flex",
         paddingLeft: "16px",
         fontFamily: "poppinsmed",
         justifyContent: "start",
         alignItems: "center",
         width: "full",
         flexDirection: "row",
       }}
       borderRadius="10px"
       _focus={{
         boxShadow: "0 0 10px rgba(3, 175, 159, 0.5)",
       }}
     >
       {selectedOption ? (
         <>
           <span>{selectedOption}</span>
         </>
       ) : (
         <>
           {" "}
           <span
             style={{
               color: "#718096",
               fontSize: "16px",
               fontFamily: "poppinsreg",
               fontWeight: "400",
               marginTop: "2px",
               marginRight: "8px",
             }}
           >
             Select an option
           </span>{" "}
         </>
       )}
     </Text>
     {isOpenn && (
       <List
         position="absolute"
         top="100%"
         left={0}
         mt={0.5}
         zIndex={1}
         width="100%"
         style={{ border: "1px solid #ccc", padding: "0.5rem 0" }}
         borderRadius="md"
         backgroundColor="white"
       >
         {optionnns.map((option) => (
           <ListItem
             key={option}
             value={role}
             style={{
               padding: "0.25rem 1.5rem",
               fontFamily: "poppins",
               fontSize: "0.9rem",
               color: "#16181B",
             }}
             _hover={{ backgroundColor: "#039E90" }}
             onClick={() => handleOptionClick(option)}
             isSelected={selectedOption === option}
           >
             {option}
           </ListItem>
         ))}
       </List>
     )}
   </Box>
 </Box>
 {/* <Box> */}
 <Button
   onClick={() => SaveUser()}
   bg="#03AF9F"
   color="white"
   _hover={{ bg: "#0D7A79" }}
   size="lg"
 >
   Save
 </Button>
</Stack>
            }
         
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}