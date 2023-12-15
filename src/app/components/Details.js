"use client"
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";

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
      <Box margin="4vh 4vh 0 0" bg="white" height="65vh" width="31vw" padding="3vh" borderRadius="2.5vh" border="1px solid #ccc" >
        {/* <Heading fontSize="2xl" mb="4">User Details</Heading> */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
                height="7vh"
                borderColor="black"
                _focus={{
                    boxShadow: '0 0 10px #03AF9F'}}
              />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                height="7vh"
                borderColor="black"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Example@gmail.com"
                onChange={handleChange}
                borderColor="black"
                height="7vh"
                _focus={{
                    boxShadow: '0 0 10px rgba(3, 175, 159, 0.5)'}}
              />
            </FormControl>
            <Button border="1px solid #03AF9F" bg='white' color="#03AF9F" height="7vh" _hover={{ bg: '#03AF9F', color: "white" }} size="lg">
              Change Password
            </Button>
            <Button bg='#03AF9F' color="white" height="7vh" _hover={{ bg: '#0d7a79' }} size="lg">
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
