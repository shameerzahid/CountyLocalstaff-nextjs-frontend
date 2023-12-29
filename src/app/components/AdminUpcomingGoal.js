"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useToast } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal, GiTrophyCup } from "react-icons/gi"; import { useEffect, useState } from "react";
import calender from '../assets/calendaricon.png'
import trophy from '../assets/trophy.png'
import stats from '../assets/statistics.png'
import goal from '../assets/mygoal.png'
import Image from "next/image";
import GoalEndPoint from "../constants/goalurls";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import NoGoal from "./NoGoal";
export default function AdminUpcomingGoal() {
  const token = useSelector(selectToken);
  const [upcoming, setUpcoming] = useState([])
  const [users, setUsers] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [upcomingGoal, setUpcomingGoal] = useState(true)
  const toast = useToast()

  const rowHeight = 3; // Set the desired height for each row in vh
  // const numRows = Math.min(Math.floor(70 / rowHeight), users.length); // Calculate the number of rows that fit within 70vh
  const bg = useToken('colors', '#F6F6F6')
  const GetCurrentGoals = async () => {
    try {

      const res = await fetch(`${GoalEndPoint}/upcoming-goals`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      const stats = await res.status
      if(stats != 200)
      setUpcomingGoal(false)
      setUpcoming(data)
      setUsers(data.users)
      setStartDate(data.startDate)
      setEndDate(data.endDate)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
   
    GetCurrentGoals()
  }, [])

  const EndGoal = async() => {
    try {
      const data = await fetch(`${GoalEndPoint}/end-goal/${upcoming._id}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
  { upcomingGoal ?
    <div style={{ padding: "0 2.5rem", marginTop: "1rem" }}>
      <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" paddingLeft="15px" paddingRight="15px" >
        <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={calender} />
        <Text marginLeft="0.5rem">upcoming goal from</Text>
        <Text width="14rem" marginLeft="1.5rem">
          {new Date(startDate).toISOString().split('T')[0]} to {new Date(endDate).toISOString().split('T')[0]}
        </Text>
        <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={goal} />
        <Text marginLeft="0.5rem">Goal Number</Text>
        <Text marginLeft="1.5rem">{users[0].goalNumber}</Text>
        {
          upcoming.repeat && <Text marginLeft="3rem" paddingTop="5px" color="#03AF9F" backgroundColor="#03af9e18" borderRadius="20px" fontWeight="500" height="34px" width="70px" textAlign="center">Repeat</Text>

        }
      </Flex>
      <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="0.7rem" paddingLeft="15px" paddingRight="15px" >
        <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={trophy} />
        <Text marginLeft="0.5rem">Goal Reward</Text>
        <Text width="14rem" marginLeft="5rem">{upcoming.reward}</Text>
        <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={stats} />
        <Text marginLeft="0.5rem">Bonus Goal</Text>
        <Text marginLeft="2.4rem">{upcoming.bonus}</Text>

      </Flex>
      <Flex flexDirection="row" justifyContent="flex-end" alignItems="center" marginTop="-35px" marginRight="-45px">
        <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="90px" border="1px solid #03AF9F" marginRight="10px" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
          Edit Goal
        </Button>
        <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="90px" bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} onClick={() => EndGoal()}>
          End Goal
        </Button>   </Flex>
      <Flex flexDirection="row" justifyContent="space-between" marginTop="1rem" >
        <div style={{ overflow: "hidden", height: "59vh", width: "66.5%", backgroundColor: "white", borderRadius: "20px", margin: "0 0 0 0", paddingLeft: "20px", border: "1px solid #ccc", paddingRight: "20px" }}>
          <div className="tablecontainer" style={{ height: "59px", width: "100%", overflowY: "hidden", backgroundColor: "white" }}>
            <Table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 1.2em" }} variant="striped" size="md" bg="white" >
              <Thead backgroundColor="white"         >
                <Tr style={{ height: "52px" }} >
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", fontFamily: "poppinsreg", color: "#0B393E", width: "50%" }} >Users</Th>
                  <Th style={{ borderBottom: "none", padding: "0px 16px", fontSize: "0.875rem", textAlign: "center", fontFamily: "poppinsreg", color: "#0B393E", width: "50%" }}>Goal No</Th>
                </Tr>
              </Thead> </Table></div>
          <div className="tablecontainer" style={{ height: "60vh", overflowY: "auto", backgroundColor: "white" }}>
            <Table className="table" style={{ borderCollapse: "separate", width: "100%", borderSpacing: "0 0.6em" }} variant="striped" size="md" bg="white"
            //  height={`${numRows * rowHeight}vh`}
             >
              <Tbody>
                {users.map((user, index) => (
                  <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius: "6px" }}>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "50%", fontFamily: "poppinsreg", fontSize: "14px" }} >{`${user.firstName} ${user.lastName}`}</Td>
                    <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "50%", fontFamily: "poppinsreg", fontSize: "14px", textAlign: "center" }} >{user.goalNumber}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

          </div> </div> </Flex>
    </div> : <NoGoal title="No Upcoming Goal"/> }  </>
  );
}
