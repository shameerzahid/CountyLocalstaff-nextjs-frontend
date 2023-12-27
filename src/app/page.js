'use client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Center, Checkbox, Container, Flex, Heading, Input, Text, useToast} from '@chakra-ui/react'
import loginimg from './assets/loginimage.webp'
import logo from './assets/transparent-logo.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setToken } from './redux/authSlice';
import { setUserId } from './redux/userIdSlice'
import './styles/styles.css'
import { useState } from 'react'
import UserEndPoint from './constants/apiruls.js'
import { setRole } from './redux/roleSlice'
export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const toast = useToast()
  const dispatch = useDispatch();
  const HandleSignIn = async (e) => {
    e.preventDefault();
    if(!email)
    {
      toast({
        title: 'Enter Email',
        description: "Email field is empty",
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      }) }
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        toast({
          title: 'Enter Valid Email',
          description: "Email not valid",
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
       else if(!password)
      {
        toast({
          title: 'Enter password',
          description: "Passwor field is empty",
          position: "bottom-right",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        }
        console.log(UserEndPoint)
        try {
          const data = await fetch(`${UserEndPoint}/login`,{
      method : "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body : JSON.stringify( {
        email,
        password
      })
    })
    const res = await data.json();
    const status = await data.status;
    // console.log(res.token)
    if(status == 200)
    {
      toast({
        title: 'Login Success',
        description: "Logged In",
        position: "bottom-right",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await dispatch(setToken(res.token));
      await dispatch(setUserId( res.User._id));
      await dispatch(setRole(res.User.role));
      router.push('/goals')
      // console.log(res.User._id)
    }
    else
    {
      toast({
        title: 'Invalid Login',
        description: "Login Again",
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      }) 
    }
        } catch (error) {
          toast({
            title: 'Invalid Login',
            description: "Login Again",
            position: "bottom-right",
            status: 'error',
            duration: 2000,
            isClosable: true,
          }) 
        }
    
  }
  return (
    <>
   <Flex  bg="#F4F9F6" className="flexbox">
      {/* Image on the left side */}
      <Box flex="1">
  <Image src={loginimg} alt="Image" className='loginimg' />
</Box>



      {/* Login page on the right side */}
      <Box className="secbox" flex="1" display="flex" flexDirection="column"
      //  margin="100px"
      >
      <span className='pagelogo'>    
         <Image className='loginlogo' src={logo} alt="Image"  priority={true}/>
</span>
<Container className='container' width="100%">
  <Flex flexDirection="column" >
  <Center>
    <h1 className='heading' style={{fontFamily: 'lato700'}}>Login</h1>
  </Center>      <Text paddingTop="5vh" color="#666" fontFamily="poppinsreg" paddingBottom="3vh" fontSize="1.1rem">To Login to your account, please enter your Email and Password below to start</Text>
      <Text as='b' fontSize="md"  fontFamily="poppinsreg">Email</Text>
      <Input placeholder='Enter Your Email' fontFamily="poppinsreg"  className="input" value={email} onChange={(e) => setEmail(e.target.value)} isRequired />
      <Text as='b' fontSize="md" fontFamily="poppinsreg" >Password</Text>
      <Input type='password' placeholder='Enter Your Password' fontFamily="poppinsreg"  className="input" value={password} onChange={(e) => setPassword(e.target.value)} isRequired/>
      <Box className='forget' >
      <Checkbox fontSize="18px" fontFamily="poppinsreg" colorScheme='green' defaultChecked>
    Remember me
  </Checkbox>
      <Link color='#0B393E' fontFamily="poppinsmed" href='#' fontSize="md">
    Forgot Password?
  </Link>

      </Box>
      <Center>
      <Button type='submit' className="button" bg='#03AF9F' color="white"  _hover={{ bg: '#0d7a79' }} size="lg" onClick={HandleSignIn} >
       <Text fontSize="lato400" fontFamily="poppinsreg">Login</Text> 
        </Button>
      </Center>
  
  </Flex>


</Container>
      
      </Box>
    </Flex>
  </>
  )
  }