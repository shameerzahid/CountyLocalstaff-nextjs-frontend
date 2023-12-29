"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useDisclosure, Progress, useToast } from "@chakra-ui/react";
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
import { useRouter } from "next/navigation";
import GoalEndPoint from "../constants/goalurls";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import NoGoal from "./NoGoal";
export default function AdminCurrentGoal() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = useSelector(selectToken);
  const [goals, setGoals] = useState([])
  const [users, setUsers] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState([])
  const [activeGoal , setActiveGoal] = useState(true)
  const [chartInitialized, setChartInitialized] = useState(false);
  const router = useRouter();
  const toast = useToast()
  const rowHeight = 3; // Set the desired height for each row in vh
  const bg = useToken('colors', '#F6F6F6')
   const handleDetails = () => {
    router.push('/user-goal')
   }
    const GetCurrentGoals = async () => {
    try {

      const res = await fetch(`${GoalEndPoint}/active-goals`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      const stat = await res.status
      if(stat != 200)
      setActiveGoal(false)
      console.log("Data : ",data)
      setGoals(data)
      setUsers(data.users)
      console.log(data.users)
      setStartDate(data.startDate)
      setEndDate(data.endDate)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
useEffect(() => {
 
  GetCurrentGoals()
}, [])

useEffect(() => {
  const GetGoalStats = async () => {
    try {
        
      const data =  await fetch(`${GoalEndPoint}/stats/${goals._id}`,{
        method : "GET",
        headers: {
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const res = await data.json()
      setPercentage(res)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  GetGoalStats()
}, [goals])
useEffect(() => {
  const initializeChart = async () => {
    // Ensure anychart library is loaded
    if (anychart.onDocumentReady) {
      anychart.onDocumentReady(() => {
        // create data
        var data = [
          { x: "Completed", value: percentage.completed_percentage},
          { x: "Bonus", value: percentage.bonus_percentage},
          { x: "Incomplete", value: percentage.incompleted_percentage },
        ];

        // create a chart and set the data
        var chart = anychart.pie(data);

        // set the container id
        chart.container("container");
        chart.palette(["#03AF9F", "#FFCE21", "#DCFF07"]);

        // initiate drawing the chart
        chart.draw();
        setChartInitialized(true);
      });
    }
  };

  initializeChart();
}, [goals]);

const EndGoal = async() => {
  try {
    const data = await fetch(`${GoalEndPoint}/end-goal/${goals._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    const status = await data.status;
    GetCurrentGoals()
    console.log(res, status);
    if (status === 200) {
      toast({
        title: 'Goal Removed',
        position: "bottom-right",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      // Use the updated state directly here
      toast({
        title: 'Cannot Delete',
        position: "bottom-right",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  } catch (error) {
    // Use the updated state directly here
    toast({
      title: error.message || 'Error updating status',
      position: "bottom-right",
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }
}
// const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh

if (loading || !chartInitialized) {
  return <div>Loading...</div>;
}
  return (
    <>
    {
      activeGoal ?
<div style={{ padding: "0 2.5rem", marginTop: "1rem" }}>
      <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" paddingLeft="15px" paddingRight="15px" >
        <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={calender} />
        {/* <FaCalendarAlt style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem" color="#212529">Active Goal from</Text>
        <Text width="14rem" marginLeft="1.5rem" color="#212529">
          {new Date(startDate).toISOString().split('T')[0]} to {new Date(endDate).toISOString().split('T')[0]}
          </Text>
        <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={goal} />
        {/* <GoGoal style={{ marginLeft: "3rem" }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem" color="#212529">Goal Number</Text>
        <Text marginLeft="1.5rem" color="#212529">
          { goals.users[0].goalNumber}
          </Text>
        {
          goals.repeat &&
          <Text marginLeft="3rem" paddingTop="5px" color="#03AF9F" backgroundColor="#03af9e18" borderRadius="20px" fontWeight="500" height="34px" width="70px" textAlign="center">Repeat</Text>

        }
      </Flex>
      <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="0.7rem" paddingLeft="15px" paddingRight="15px" >
      <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={trophy} />
        {/* <GiTrophyCup style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem">Goal Reward</Text>
        <Text width="14rem" marginLeft="3.5rem">
          {goals.reward} 
          </Text>
        <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={stats} />
        {/* <GiStairsGoal style={{ marginLeft: "2.8rem" }} color="#03AF9F" /> */}
        <Text marginLeft="0.5rem">Bonus Goal</Text>
        <Text marginLeft="2.4rem">
          {goals.bonus} 
          </Text>
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between" marginTop="1rem" >
        <div style={{ overflow: "hidden", height: "59vh", width: "66.5%", backgroundColor: "white", borderRadius: "20px", margin: "0 0 0 0", paddingLeft: "20px", border: "1px solid #ccc", paddingRight: "20px" }}>
          <div className="tablecontainer" style={{ height: "59px", width: "100%", overflowY: "hidden", backgroundColor: "white" }}>
            <Table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 1.2em" }} variant="striped" size="md" bg="white" >
              <Thead backgroundColor="white"         >
                <Tr style={{ height: "52px" }} >
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "20%" }} >Users</Th>
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "20%" }}>Last Updated</Th>
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "45%" }}>progress</Th>
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsmed", fontWeight: '500', color: "#0B393E", width: "15%" }}></Th>
                </Tr>
              </Thead> </Table></div>
          <div className="tablecontainer" style={{ height: "50vh", width: "100%", overflowY: "auto", backgroundColor: "white" }}>
            <Table className="table" paddingBottom="10px" style={{ borderCollapse: "separate", width: "100%", borderSpacing: "0 0.6em" }} variant="striped" size="md" bg="white" 
            // height={`${numRows * rowHeight}vh`}
            >
              <Tbody>
                {users.map((user, index) => (
                  <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius: "6px" }}>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px" }} >{`${user.firstName} ${user.lastName}`}</Td>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 20px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px" }} >{user.lastUpdated == null ? "00-00-00000" : new Date(user.lastUpdated).toISOString().split('T')[0]  }</Td>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "45%", fontFamily: "poppinsreg", fontSize: "12px" }} >{user.complete_percentage}% completed + <span style={{ color: "#03AF9F" }}>{user.bonus}% Bonus</span>
                      <Progress value={user.complete_percentage} size='md' />
                    </Td>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "15%" }} >
                      <Button onClick={handleDetails} fontSize="16px" fontFamily="poppinsmed" height="38px" border="1px solid #03AF9F" borderRadius="0.25rem" lineHeight="24px" fontWeight="400" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
                        Details
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

          </div> </div>
        <Flex flexDirection="column" height="59vh" width="31%" backgroundColor="white" borderRadius="15px" border="1px solid #ccc">
          <h5 style={{ paddingLeft: "1.5rem", fontSize: "1.1rem", paddingTop: "1rem", fontFamily: "poppinsmed" }}>Team Overview</h5>
          {chartInitialized && <div id="container" style={{ height: '70%', width: "100%", margin: "auto", marginBottom: "0", marginTop: "5px" }}></div>}          <Flex flexDirection="row" justifyContent="center" alignItems="center" marginTop="10px">
            <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="45%" border="1px solid #03AF9F" marginRight="10px" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
              Edit Goal
            </Button>
            <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="45%" bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} onClick={() => EndGoal()}>
              End Goal
            </Button>   </Flex>
        </Flex>
      </Flex>
    </div> : <NoGoal title="No Current Goal" />
    }
     </>
  );
}
