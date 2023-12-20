// app/page.tsx
"use client";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import loginimg from "./assets/loginimage.webp";
import logo from "./assets/transparent-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      <Flex bg="#F4F9F6" className="flexbox">
        {/* Image on the left side */}
        <Box flex="1">
          <Image src={loginimg} alt="Image" className="loginimg" />
        </Box>

        {/* Login page on the right side */}

        <Box
          className="secbox"
          flex="1"
          display="flex"
          flexDirection="column"
          //  margin="100px"
        >
          <span className="pagelogo">
            <Image
              className="loginlogo"
              src={logo}
              alt="Image"
              priority={true}
            />
          </span>
          <Container className="container">
            <Flex flexDirection="column">
              <Center>
                <h1 className="heading">Login</h1>
              </Center>{" "}
              <Text
                paddingTop="5vh"
                color="#666"
                paddingBottom="3vh"
                fontSize="1.1rem"
              >
                To Login to your account, please enter your Email and Password
                below to start
              </Text>
              <Text as="b" fontSize="md">
                Email
              </Text>
              <Input placeholder="Enter Your Email" className="input" />
              <Text as="b" fontSize="md">
                Password
              </Text>
              <Input placeholder="Enter Your Password" className="input" />
              <Box className="forget">
                <Checkbox fontSize="18px" colorScheme="green" defaultChecked>
                  Remember me
                </Checkbox>
                <Link color="#0B393E" href="#" fontWeight="bold" fontSize="md">
                  Forgot Password?
                </Link>
              </Box>
              <Center>
                <Button
                  className="button"
                  bg="#03AF9F"
                  color="white"
                  _hover={{ bg: "#0d7a79" }}
                  size="lg"
                  onClick={() => router.push("/users")}
                >
                  <Text fontSize="1.2rem">Login</Text>
                </Button>
              </Center>
            </Flex>
          </Container>
        </Box>
      </Flex>
    </>
  );
}
