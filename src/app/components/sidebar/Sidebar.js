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
      width={navSize == "small" ? "76px" : "255px"}
      flexDir="column"
      justifyContent="space-between"
      backgroundColor="#0B393E"
      color="white"
      padding="0 0 0 0"
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
          icon={() => (
            <svg
            width="22"
            height="22"
            viewBox="0 0 27 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5078 6.35742L19.6172 0.423828C19.2656 0.181641 18.8438 0 18.4219 0H18V7.75H27V7.38672C27 7.02344 26.7891 6.66016 26.5078 6.35742ZM15.75 8.23438V0H1.6875C0.703125 0 0 0.666016 0 1.45312V29.5469C0 30.3945 0.703125 31 1.6875 31H25.3125C26.2266 31 27 30.3945 27 29.5469V9.6875H17.4375C16.4531 9.6875 15.75 9.08203 15.75 8.23438ZM9 26.3984C9 26.7617 8.50781 27.125 8.08594 27.125H5.34375C4.92188 27.125 4.5 26.7617 4.5 26.3984V22.0996C4.5 21.7363 4.92188 21.3125 5.34375 21.3125H8.08594C8.50781 21.3125 9 21.7363 9 22.0996V26.3984ZM15.75 26.3984C15.75 26.7617 15.2578 27.125 14.8359 27.125H12.0938C11.6719 27.125 11.25 26.7617 11.25 26.3984V14.3496C11.25 13.9863 11.6719 13.5625 12.0938 13.5625H14.8359C15.2578 13.5625 15.75 13.9863 15.75 14.3496V26.3984ZM18 18.2246C18 17.8613 18.4219 17.4375 18.8438 17.4375H21.5859C22.0078 17.4375 22.5 17.8613 22.5 18.2246V26.3984C22.5 26.7617 22.0078 27.125 21.5859 27.125H18.8438C18.4219 27.125 18 26.7617 18 26.3984V18.2246Z"
              fill="currentcolor"
            >
              <animate
                attributeName="fill"
                values="#03AF9F; #FFFFFF"
                dur="0.3s"
                begin="mouseover"
              />
              <animate
                attributeName="fill"
                values="#FFFFFF; #03AF9F"
                dur="0.3s"
                begin="mouseout"
              />
            </path>
          </svg>
          
          )}
          title="Reports"
          goto="reports"
          active={pathname === "/reports" ? true : false}
        />
        <NavItem
          navSize={navSize}
          icon={() => (
            <svg
              width="22"
              height="22"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.78641 0.054493C1.12645 0.21797 0.533089 0.702345 0.2243 1.32598L0.0305503 1.72559L0.0123862 15.0762C-0.00577783 30.0979 -0.0481606 28.7416 0.454378 29.0383L0.708675 29.1836L6.38797 29.1715L12.0673 29.1533L11.7888 28.8143C10.5718 27.3188 9.68778 25.1451 9.53036 23.2439L9.48797 22.7596L9.25184 22.6627C8.80379 22.4811 8.57372 22.0209 8.71297 21.5607C8.79168 21.2822 8.99754 21.0885 9.30633 20.9795L9.53641 20.9008L9.69383 20.1197C9.86942 19.2902 10.1903 18.2973 10.4809 17.7281C10.5778 17.5404 10.6565 17.3648 10.6565 17.3467C10.6565 17.3285 10.3659 17.3164 10.0147 17.3164C9.4577 17.3164 9.33661 17.2982 9.13075 17.1832C8.69481 16.935 8.5495 16.4385 8.77957 15.9844C9.0036 15.5484 9.18524 15.5 10.6202 15.5H11.8614L12.4245 14.9188C14.2954 12.9813 16.5417 11.9096 19.2118 11.6734L20.0413 11.6008V8.55527V5.50977H12.6788H5.31629L5.07411 5.37656C4.65028 5.14043 4.63817 5.06777 4.60184 3.33008C4.57157 1.90723 4.55946 1.75586 4.43231 1.44102C4.26883 1.03535 3.85106 0.544922 3.47567 0.326954C2.99129 0.0423832 2.295 -0.0666008 1.78641 0.054493ZM7.29012 9.25762C7.38094 9.31816 7.51414 9.45137 7.57469 9.54219C7.72 9.76621 7.72606 10.2688 7.59286 10.4746C7.39305 10.7713 5.65535 12.4848 5.43739 12.5998C5.15282 12.7451 4.89852 12.7451 4.61395 12.5998C4.34149 12.4545 3.43934 11.5463 3.30614 11.2799C2.9368 10.5412 3.76024 9.71777 4.49891 10.0871C4.60789 10.1416 4.76532 10.2566 4.86219 10.3414L5.02567 10.4988L5.61903 9.91758C5.93993 9.60274 6.27293 9.29395 6.3577 9.23945C6.56356 9.10625 7.0661 9.1123 7.29012 9.25762ZM15.7425 10.1719C16.0149 10.3111 16.2268 10.6562 16.2268 10.959C16.2268 11.2617 16.0149 11.6068 15.7425 11.7461C15.5124 11.8611 15.3913 11.8672 12.4427 11.8672C9.49403 11.8672 9.37293 11.8611 9.14286 11.7461C8.87039 11.6068 8.65848 11.2617 8.65848 10.959C8.65848 10.6684 8.87039 10.3111 9.13075 10.1779C9.34266 10.0629 9.48797 10.0568 12.4306 10.0508C15.3973 10.0508 15.5124 10.0568 15.7425 10.1719ZM7.29012 14.7674C7.38094 14.8279 7.51414 14.9611 7.57469 15.052C7.72 15.276 7.72606 15.7785 7.59286 15.9844C7.39305 16.2811 5.65535 17.9945 5.43739 18.1096C5.15282 18.2549 4.89852 18.2549 4.61395 18.1096C4.34149 17.9643 3.43934 17.0561 3.30614 16.7896C2.9368 16.051 3.76024 15.2275 4.49891 15.5969C4.60789 15.6514 4.76532 15.7664 4.86219 15.8512L5.02567 16.0086L5.61903 15.4273C5.93993 15.1125 6.27293 14.8037 6.3577 14.7492C6.56356 14.616 7.0661 14.6221 7.29012 14.7674ZM7.20536 20.15C7.62918 20.3619 7.82293 20.9432 7.60496 21.3609C7.55653 21.4518 7.05399 21.9846 6.4909 22.5416C5.395 23.6375 5.26786 23.7162 4.80164 23.6133C4.50496 23.5406 3.36063 22.4145 3.2577 22.0875C3.08211 21.5002 3.49989 20.9492 4.11746 20.9492C4.40809 20.9492 4.55946 21.0158 4.83192 21.2701L5.02567 21.4578L5.67957 20.816C6.0368 20.4588 6.39403 20.1379 6.47879 20.1076C6.70887 20.0168 6.97528 20.0289 7.20536 20.15Z"
                fill="currentColor"
              />
              <path
                d="M5.76468 0.042383C6.30355 1.0959 6.41859 1.58027 6.41859 2.81543V3.69336H14.5924H22.7662V3.28164C22.7602 1.75586 21.7309 0.435938 20.2778 0.0908203C19.9448 0.0121095 18.9094 0 12.8184 0C8.92523 0 5.75257 0.0181642 5.76468 0.042383Z"
                fill="currentColor"
              />
              <path
                d="M26.3686 11.3525C26.187 11.4191 25.739 11.8309 24.3948 13.1811C22.8872 14.6947 22.645 14.9611 22.5845 15.1852C22.5239 15.4273 22.5421 15.5182 23.0083 16.9229C23.3231 17.8734 23.5532 18.4729 23.6501 18.5818C23.7772 18.7332 24.0315 18.8361 25.2667 19.2479C26.072 19.5203 26.8106 19.7383 26.9015 19.7383C26.9923 19.7383 27.1558 19.6959 27.2647 19.6414C27.5311 19.5082 30.7401 16.3113 30.8854 16.0328C31.0308 15.7422 31.0308 15.4939 30.8794 15.1973C30.728 14.8945 30.5767 14.8219 29.2749 14.3859L28.2395 14.0469L27.9186 13.06C27.7431 12.5211 27.5433 11.9641 27.4767 11.8248C27.2769 11.401 26.8106 11.2012 26.3686 11.3525Z"
                fill="currentColor"
              />
              <path
                d="M19.1934 13.4777C17.8311 13.6533 16.6746 14.0408 15.5908 14.6826C13.1266 16.1539 11.5342 18.7089 11.3344 21.5123C11.2133 23.1289 11.4736 24.5578 12.1457 25.9746C14.5736 31.1029 21.143 32.5984 25.5932 29.0322C27.0887 27.8334 28.118 26.1804 28.6145 24.1884C28.784 23.5103 28.8688 22.1238 28.7961 21.3003L28.7477 20.8341L28.4691 21.04C27.9424 21.4154 27.5973 21.5183 26.8828 21.5183C26.2955 21.5123 26.1926 21.4941 25.5266 21.264C25.127 21.1248 24.7939 21.0218 24.7818 21.0339C24.7697 21.0461 24.7879 21.1732 24.8182 21.3185C24.909 21.706 24.8969 22.7898 24.8 23.256C24.4367 24.9695 23.0744 26.3984 21.3307 26.8949C20.6586 27.0886 19.484 27.0886 18.8119 26.8949C17.4072 26.4953 16.2508 25.5144 15.6695 24.2369C15.0943 22.9654 15.1004 21.4214 15.6816 20.1802C16.5717 18.267 18.709 17.1105 20.7615 17.4314C21.0037 17.4677 21.2217 17.492 21.2338 17.4738C21.252 17.4617 21.149 17.0984 21.0037 16.6685C20.7797 15.9964 20.7494 15.8269 20.7494 15.3789C20.7555 14.7916 20.8887 14.3617 21.2217 13.8712C21.3912 13.6109 21.4033 13.5625 21.3186 13.5322C21.1975 13.4837 19.49 13.4414 19.1934 13.4777Z"
                fill="currentColor"
              />
              <path
                d="M19.4359 19.2539C18.9818 19.3508 18.3219 19.7141 17.9646 20.0652C17.3592 20.6586 17.0625 21.367 17.0625 22.2207C17.0625 23.3893 17.6982 24.4065 18.7336 24.9151C20.1141 25.5932 21.7004 25.1694 22.5844 23.8858C23.1354 23.0865 23.2322 21.9846 22.8326 20.9856L22.76 20.81L21.6277 21.9301C20.659 22.8928 20.4592 23.0623 20.2654 23.0986C19.7811 23.1895 19.333 22.9049 19.1998 22.4326C19.0848 22.0027 19.1816 21.8514 20.3502 20.6768C20.9436 20.0713 21.434 19.5627 21.434 19.5445C21.434 19.5203 21.2766 19.4477 21.0889 19.375C20.6893 19.2236 19.8658 19.1631 19.4359 19.2539Z"
                fill="currentColor"
              />
            </svg>
          )}
          title="Active Goals"
          goto="active-goal"
          active={pathname === "/active-goal" ? true : false}
        />
      </Flex>

      <Flex
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={3}
      >
        <NavItem
          navSize={navSize}
          onClick = {() => console.log("logout")}
          icon={() => (
            <svg
              width="22"
              height="22"
              viewBox="0 0 26 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.04688 0.0382824C1.94766 0.224218 0.963281 1.09375 0.624219 2.16016L0.503906 2.54297V12.25V21.957L0.646094 22.3453C0.826563 22.8375 1.12734 23.2914 1.48281 23.6031C1.72344 23.8164 7.49844 27.207 8.41719 27.6773C8.80547 27.8742 9.31406 28 9.72969 28C10.7305 28 11.8352 27.3875 12.3383 26.5508C12.6938 25.9602 12.7484 25.7305 12.7813 24.582L12.8086 23.543L15.3516 23.5156C17.807 23.4883 17.9055 23.4828 18.2117 23.368C19.2398 22.9797 19.9672 22.1375 20.1914 21.082C20.2898 20.6172 20.3117 17.1664 20.2188 16.8328C20.0984 16.4008 19.7211 16.1164 19.2617 16.1164C18.8242 16.1164 18.507 16.3352 18.332 16.7453C18.2664 16.9148 18.25 17.2594 18.25 18.8234C18.25 20.5242 18.2391 20.7211 18.1461 20.918C18.0258 21.1914 17.7688 21.4156 17.4953 21.4922C17.3695 21.525 16.418 21.5469 15.0398 21.5469H12.7813V14.6125C12.7813 6.99453 12.7977 7.41016 12.4477 6.71016C12.3383 6.49688 12.1305 6.22891 11.8844 5.98828C11.5289 5.63828 11.2336 5.45781 8.40625 3.82812L5.31094 2.05078L11.4086 2.03438L17.5117 2.02344L17.7523 2.17109C17.9055 2.26953 18.0422 2.41172 18.1242 2.56484C18.25 2.80547 18.25 2.81094 18.25 4.94375C18.25 6.90156 18.2609 7.09844 18.3539 7.30078C18.6656 7.98984 19.5406 8.11563 20.0219 7.54688C20.268 7.25156 20.2844 7.0875 20.2625 4.70859C20.2461 2.55391 20.2406 2.47734 20.1203 2.13281C19.9453 1.64609 19.7594 1.33984 19.4094 0.973438C19.0539 0.596094 18.6984 0.360937 18.2063 0.169531L17.8398 0.0273438L10.5117 0.0218754C6.48125 0.016407 3.12344 0.0218754 3.04688 0.0382824Z"
                fill="currentcolor"
              />
              <path
                d="M21.4766 7.97891C20.9898 8.13203 20.7109 8.48203 20.7109 8.93594C20.7109 9.32969 20.8148 9.49375 21.4711 10.1445L22.0781 10.7461L18.2008 10.7734L14.3234 10.8008L14.1102 10.9703C13.8422 11.1891 13.7109 11.4461 13.7109 11.7797C13.7109 12.1406 13.9133 12.4797 14.2195 12.6492L14.4492 12.7695L18.2391 12.7969L22.0234 12.8242L21.4711 13.3711C21.1703 13.6719 20.875 14.0109 20.8148 14.1203C20.7 14.3445 20.6781 14.7273 20.7711 14.968C20.8969 15.3016 21.318 15.5859 21.6953 15.5859C22.0781 15.5859 22.2859 15.4164 23.8664 13.8305C25.1461 12.5398 25.4141 12.2391 25.4633 12.0586C25.5398 11.7852 25.5398 11.7305 25.4633 11.457C25.4141 11.2766 25.1461 10.9813 23.9156 9.74531C23.1008 8.91953 22.3352 8.19219 22.2148 8.12109C21.9633 7.97344 21.6734 7.91875 21.4766 7.97891Z"
                fill="currentcolor"
              />
            </svg>
          )}
          title="Logout"
          goto="/"
        />
      </Flex>
    </Flex>
  );
}
