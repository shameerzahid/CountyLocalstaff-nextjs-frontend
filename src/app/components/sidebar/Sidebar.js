"use client"
import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Menu,
    MenuButton
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
import Link from 'next/link'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    const [goal, setGoal] = useState(false);
    const [userActive, setuserActive] = useState(false);
    const [reportActive, setreportActive] = useState(false);
    const [ActiveGoal, setActiveGoal] = useState(false);
    const [logout, setLogout] = useState(false);
    const goalActive = () => {
        setGoal(true)
        setuserActive(false)
        setreportActive(false)
        setActiveGoal(false)
        setLogout(false)
    }

    const usersActive = () => {
        setGoal(false)
        setuserActive(true)
        setreportActive(false)
        setActiveGoal(false)
        setLogout(false)
    }
    const reportsActive = () => {
        setGoal(false)
        setuserActive(false)
        setreportActive(true)
        setActiveGoal(false)
        setLogout(false)
    }
    const activeGoalActive = () => {
        setGoal(false)
        setuserActive(false)
        setreportActive(false)
        setActiveGoal(true)
        setLogout(false)
    }
    const LogoutActive = () => {
        setGoal(false)
        setuserActive(false)
        setreportActive(false)
        setActiveGoal(false)
        setLogout(true)
    }
    return (
        <Flex
            pos="sticky"
            h="100vh"
            className='sidebartop'
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "80px" : "255px"}
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
                <Flex flexDirection="row" justifyContent="space-between" marginTop="8px" width={navSize=="large" ? "230px": "75px"}>
                {
                    navSize == "large" ?
                    <Image className='sidebarlogo' src={logo} alt="Image"  priority={true}/> :
                    <Image className='sidebarlogosmall' src={LogoIcon} alt="Image"  priority={true}/>


                }
                <IconButton
    background="none"
    marginTop="25px"
    _hover={{ background: 'none' }}
    style={{ fontSize: '35px',color: 'white'}}
    // marginLeft={navSize=="large" ? "6vw": ""}
    icon={navSize == 'large' ? <Image src={Lefticon} style={{marginLeft: "20px"}} /> : <Image src={Righticon} style={{ marginLeft: "-10px"}} />}
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