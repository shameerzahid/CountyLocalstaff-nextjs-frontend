"use client";
import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import "./sidebar.css";
import { GoGoal } from "react-icons/go";
import { FaUserTie } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { IoPawOutline } from "react-icons/io5";
import NavItem from "./NavItem";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import LogoIcon from "../../assets/Logo-icon.png";
import Lefticon from "../../assets/icon-bar-togle.png";
import Righticon from "../../assets/sidebartoggle.png";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const pathname = usePathname();

  return (
    <Flex
      pos="sticky"
      h="100vh"
      className="sidebartop"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      // borderRadius={navSize == "small" ? "15px" : "30px"}
      width={navSize == "small" ? "76px" : "255px"}
      flexDir="column"
      justifyContent="space-between"
      backgroundColor="#0B393E"
      color="white"
      padding="0 0 0 0"
      // transition={navSize == "small" ? "width 0.3s ease-in-out" : ""}
    >
      <Flex
        paddingLeft={navSize == "small" ? "0%" : "0%"}
        paddingTop="4%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex
          flexDirection="row"
          marginBottom={navSize == "large" ? "10px" : "28px"}
        >
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width={navSize == "large" ? "230px" : "75px"}
          >
            {navSize == "large" ? (
              <Image
                className="sidebarlogo"
                src={logo}
                alt="Image"
                priority={true}
              />
            ) : (
              <Image
                className="sidebarlogosmall"
                src={LogoIcon}
                alt="Image"
                priority={true}
              />
            )}
          </Flex>
          <IconButton
            background="none"
            marginTop="25px"
            _hover={{ background: "none" }}
            style={{ fontSize: "35px", color: "white" }}
            // marginLeft={navSize=="large" ? "6vw": ""}
            icon={
              navSize == "large" ? (
                <Image src={Lefticon} style={{ marginLeft: "20px" }} />
              ) : (
                <Image src={Righticon} style={{ marginLeft: "6px" }} />
              )
            }
            onClick={() => {
              if (navSize == "small") changeNavSize("large");
              else changeNavSize("small");
            }}
          />
        </Flex>
        <NavItem
          navSize={navSize}
          icon={GoGoal}
          title="Goal"
          goto="goals"
          description="This is the description for the dashboard."
          active={pathname === "/goals" ? true : false}
        />
        <NavItem
          navSize={navSize}
          icon={FaUserTie}
          title="Users"
          goto="users"
          active={pathname === "/users" ? true : false}
        />
        <NavItem
          navSize={navSize}
          icon={BiSolidReport}
          title="Reports"
          goto="reports"
          active={pathname === "/reports" ? true : false}
        />
        <NavItem
          navSize={navSize}
          icon={IoPawOutline}
          title="Active Goals"
          goto="active-goal"
          active={pathname === "/active-goal" ? true : false}
        />
      </Flex>

      <Flex
        // paddingLeft="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={3}
      >
        <NavItem navSize={navSize} icon={VscSignOut} title="Logout" goto="/" />
      </Flex>
    </Flex>
  );
}
