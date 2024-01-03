"use client"
import Chart from 'chart.js/auto';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useDisclosure, Progress, Box, Heading, Icon } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi";
import anychart from 'anychart';
import '../styles/styles.css'
import { useEffect, useRef, useState } from "react";
import calender from '../assets/calendaricon.png'
import trophy from '../assets/trophy.png'
import stats from '../assets/statistics.png'
import goal from '../assets/mygoal.png'
import Image from "next/image";
import Sidebar from "../components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { selectToken } from "../redux/authSlice";
import GoalEndPoint from "../constants/goalurls";

export default function UserGoal() {
  const token = useSelector(selectToken);
  const router = useRouter()
  const canvas = useRef();
  const rowHeight = 3; // Set the desired height for each row in vh
  // const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken('colors', '#F6F6F6')
  const handleIconClick = () => {
    // Go back one step in history
    router.back();
  };
  const pieChart = () => {
    if (typeof window !== 'undefined') {
      const ctx = canvas.current;
      let chartStatus = Chart.getChart('myChart');
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Completed', 'Bonus', 'Incomplete'],
          datasets: [
            {
              label: 'value',
              data: [21,22,23],
            //   [goalstats.completed_percentage, goalstats.incompleted_percentage, goalstats.bonus_percentage],
              backgroundColor: [
                'rgba(3, 175, 159, 1)',
                'rgba(255, 206, 33, 1)',
                'rgba(220, 255, 7, 1)'
              ],
              borderColor: [
                'rgba(3, 175, 159, 1)',
                'rgba(255, 206, 33, 1)',
                'rgba(220, 255, 7, 1)'
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              left: 20, // Adjust the left padding to create space
              right: 20, // Adjust the right padding to create space
              top: 20, // Adjust the top padding to create space
              bottom: 20, // Adjust the bottom padding to create space
            }
          },
          plugins: {

            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 12, // Adjust the font size for legends
                },
                boxWidth: 14,
              },
            },
            title: {
              display: false,
            },
            datalabels: {
              color: '#fff',
              anchor: 'end',
              align: 'start',
              formatter: (value, context) => {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return `${percentage}%`;
              },
              offset: 10,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    pieChart();
  }, []);

  const UserDetails = () => {
    router.push('/user-goal')
  }

  return (

    <div style={{ backgroundColor: "#F4F9F6", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      {false ? (
        <div>Loading...</div>
      ) : (
        <Box margin="27px 40px 20px 32px" width="calc(100% - 11vw)">
          <Flex flexDirection="row" alignItems="center" marginLeft="25px" marginBottom="1.5rem">
            <Icon backgroundColor="red" as={() => (<svg onClick={handleIconClick} style={{ backgroundColor: "#03AF9F", cursor: "pointer", height: '1.7rem', borderRadius: "3px", width: "1.6rem" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.9999 11H6.41394L11.7069 5.707L10.2929 4.293L2.58594 12L10.2929 19.707L11.7069 18.293L6.41394 13H20.9999V11Z" fill="white"></path>
            </svg>)} />
            <Heading marginLeft="15px" fontSize="2.4rem" fontFamily="lato700" color="#212529">21-23-2342</Heading> </Flex>
          <div style={{ padding: "0 0.5rem"}}>
            <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" paddingLeft="15px" paddingRight="15px" >
              <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={calender} />
              {/* <FaCalendarAlt style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
              <Text marginLeft="0.5rem" color="#212529">Active Goal From</Text>
              <Text width="14rem" marginLeft="1.5rem" color="#212529"> date to date
                {/* {new Date(userData.startDate).toISOString().split('T')[0]} to {new Date(userData.endDate).toISOString().split('T')[0]} */}
              </Text>
              <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={goal} />
              {/* <GoGoal style={{ marginLeft: "3rem" }} color="#03AF9F" /> */}
              <Text marginLeft="0.5rem" color="#212529">Goal Number</Text>
              <Text marginLeft="1.5rem" color="#212529">22</Text>
            </Flex>
            <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="0.9rem" paddingLeft="15px" paddingRight="15px" >
              <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={trophy} />
              {/* <GiTrophyCup style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
              <Text marginLeft="0.5rem">Goal Reward</Text>
              <Text width="14rem" marginLeft="3.5rem">21</Text>
              <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={stats} />
              {/* <GiStairsGoal style={{ marginLeft: "2.8rem" }} color="#03AF9F" /> */}
              <Text marginLeft="0.5rem">Bonus Goal</Text>
              <Text marginLeft="2.4rem">21</Text>
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between" marginTop="1rem" marginLeft="-0.8rem"  >
            <div style={{ overflow: "hidden", height: "65vh", width: "68%", backgroundColor: "white", borderRadius: "15px", margin: "0 0 0 0", paddingLeft: "20px", border: "1px solid #ccc", paddingRight: "20px" }}>
            <div className="tablecontainer" style={{ height: "59px", width: "100%", overflowY: "hidden", backgroundColor: "white" }}>
              <Table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 1.2em" }} variant="striped" size="md" bg="white" >
                <Thead backgroundColor="white"         >
                  <Tr style={{ height: "52px" }} >
                    <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E",width: "25.7%", }} >Users</Th>
                    <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "45%",}}>progress</Th>
                    <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E",  width: "15%", }}></Th>
                  </Tr>
                </Thead> </Table></div>
            <div className="tablecontainer" style={{ height: "50vh", width: "100%", overflowY: "auto", backgroundColor: "white" }}>
              <Table className="table" paddingBottom="10px" style={{ borderCollapse: "separate", width: "100%", borderSpacing: "0 0.6em" }} variant="striped" size="md" bg="white"
              >
                <Tbody>
                  {[2,21,1].map((user, index) => (
                    <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius: "6px" }}>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "27%", fontFamily: "poppinsreg", fontSize: "14px" }} >shameer</Td>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "45%", fontFamily: "poppinsreg", fontSize: "12px" }} >
                        {/* {user.complete_percentage}% completed + <span style={{ color: "#03AF9F" }}>{user.bonus}% Bonus */}
                        {/* </span> */} 2121
                        <Progress
                        //  value={user.complete_percentage} 
                         size='md' />
                      </Td>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "18%"}} >
                        <Button fontSize="16px" fontFamily="poppinsmed" height="38px" border="1px solid #03AF9F" borderRadius="0.25rem" lineHeight="24px" fontWeight="400" bg='transparent' color="#03AF9F" onClick={() => UserDetails()} _hover={{ bg: '#03AF9F', color: "white" }}>
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

            </div> </div>
              <Flex flexDirection="column" height = "65vh" width="31%" border="1px solid #ccc" backgroundColor="white" borderRadius="15px">
                <h5 style={{ paddingLeft: "1.5rem", fontSize: "1.1rem", paddingTop: "1rem", fontFamily: "poppinsmed" }}>Team Overview</h5>
                <div id="container" style={{ height: '85%', width: "100%", marginBottom: "0", marginTop: "5px", display: "flex", justifyContent: "center" }}>     <canvas id='myChart' ref={canvas}></canvas>
                </div>
              </Flex>
            </Flex>
          </div>
        </Box>)}
    </div>
  );
}
