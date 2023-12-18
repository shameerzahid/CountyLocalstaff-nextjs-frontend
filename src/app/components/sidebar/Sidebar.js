"use client"
import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
} from 'react-icons/fi'
import './sidebar.css'
import { GoGoal } from "react-icons/go";
import { FaUserTie } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import logo from '../../assets/Logo.png'
import Image from 'next/image'
import LogoIcon from '../../assets/Logo-icon.png'
import Lefticon from '../../assets/icon-bar-togle.png'
import Righticon from '../../assets/sidebartoggle.png'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            h="100vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "6vw" : "24vw"}
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#0B393E"
            color="white"
            padding="0 0 0 0"
        >
            <Flex
                paddingLeft={navSize == "small" ? "0%" : "6%"}
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <Flex flexDirection="row" justifyContent="space-between" marginTop="4vh" width={navSize=="large" ? "20.1vw": "8.5vw"}>
                {
                    navSize == "large" ?
                    <Image className='sidebarlogo' src={logo} alt="Image"  priority={true}/> :
                    <Image className='sidebarlogo' style={{height: "3.5rem", marginLeft: "1.5vw"}} src={LogoIcon} alt="Image"  priority={true}/>


                }
                <IconButton
    background="none"
    mt={5}
    _hover={{ background: 'none' }}
    style={{ fontSize: '35px',color: 'white'}}
    // marginLeft={navSize=="large" ? "6vw": ""}
    icon={navSize == 'large' ? <Image src={Lefticon} style={{marginLeft: "0.5vw"}} /> : <Image src={Righticon} style={{ marginLeft: "-1vw"}} />}
    onClick={() => {
        if (navSize == "small")
            changeNavSize("large")
        else
            changeNavSize("small")
    }}
/>
                </Flex>   
                <NavItem navSize={navSize} icon={GoGoal} title="Goals" goto="goals" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={FaUserTie} title="Users" goto="users" active />
                <NavItem navSize={navSize} icon={BiSolidReport} title="Reports" goto="reports"  />
                <NavItem navSize={navSize} icon={IoPawOutline} title="Active Goals" goto="users"  />
            </Flex>

            <Flex
                paddingLeft="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                {/* <Flex mt={4} align="center"> */}
                    {/* <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}> */}
                    <NavItem navSize={navSize} icon={VscSignOut} title="Logout" />
                    {/* </Flex> */}
                {/* </Flex> */}
            </Flex>
        </Flex>
    )
}