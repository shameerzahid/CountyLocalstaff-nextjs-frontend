"use client"
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import '../styles/styles.css'
export default function Details() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Box margin="2rem 20px 0 0" bg="white" height="415px" width="448px" padding="24px" borderRadius="18px" border="1px solid #ccc" >
        {/* <Heading fontSize="2xl" mb="4">User Details</Heading> */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="firstName">
              <FormLabel fontSize="0.8rem" fontFamily="poppinsmed">First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                fontFamily="poppinsmed"
                onChange={handleChange}
                height="49px"
                borderColor="black"
                _focus={{
                    boxShadow: '0 0 10px #03AF9F'}}
              />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel fontSize="0.8rem" fontFamily="poppinsmed">Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                fontFamily="poppinsmed"
                height="45px"
                borderColor="black"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel fontSize="0.8rem" fontFamily="poppinsmed">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Example@gmail.com"
                onChange={handleChange}
                fontFamily="poppinsmed"
                borderColor="black"
                height="45px"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
            </FormControl>
            <Button border="1px solid #03AF9F" fontFamily="lato700" bg='white' color="#03AF9F" height="42px" _hover={{ bg: '#03AF9F', color: "white" }} size="lg">
              Change Password
            </Button>
            <Button bg='#03AF9F' color="white" fontFamily="lato700" height="42px" _hover={{ bg: '#0d7a79' }} size="lg">
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
