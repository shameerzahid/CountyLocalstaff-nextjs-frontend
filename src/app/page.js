// app/page.tsx
'use client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Center, Checkbox, Container, Flex, Heading, Input, Text} from '@chakra-ui/react'
import loginimg from './assets/loginimage.webp'
import logo from './assets/Logo.png'
import Image from 'next/image'

export default function Page() {
  return (
    <>
   <Flex  bg="#F4F9F6" className="flexbox">
      {/* Image on the left side */}
      <Box flex="1">
  <Image src={loginimg} alt="Image" className='loginimg' />
</Box>



      {/* Login page on the right side */}

      <Box className="secbox" flex="1" display="flex" flexDirection="column"  alignItems="center"
      //  margin="100px"
      >
      <Container margin="9vh 0 3vh 3vh">    
         <Image className='loginlogo' src={logo} alt="Image"  priority={true}/>
</Container>
<Container className='container'>
<Center>
    <h1 className='heading'
    //  size="3xl" color="#0B393E"
     >Login</h1>
  </Center>      <Text paddingTop="5vh" color="#666" paddingBottom="3vh" fontSize="2xl">To Login to your account, please enter your Email and Password below to start</Text>
      <Text as='b' fontSize="xl" >Email</Text>
      <Input placeholder='Enter Your Email' className="input"  />
      <Text as='b' fontSize="xl" >Password</Text>
      <Input placeholder='Enter Your Password' className="input"/>
      <Box className='forget' >
      <Checkbox size='lg' colorScheme='green' defaultChecked>
    Remember me
  </Checkbox>
      <Link color='#0B393E' href='#' fontWeight="bold" fontSize="xl">
    Forgot Password?
  </Link>

      </Box>
      <Center>
      <Button className="button" bg='#03AF9F' color="white"  _hover={{ bg: '#0d7a79' }} size="lg" >
       <Text fontSize="2xl">Login</Text> 
        </Button>
      </Center>
  

</Container>
      
      </Box>
    </Flex>
  </>
  )
}