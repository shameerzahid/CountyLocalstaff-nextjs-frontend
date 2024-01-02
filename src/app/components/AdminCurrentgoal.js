"use client"
import { Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, useToken, useDisclosure, Progress, useToast, ChakraProvider, extendTheme } from "@chakra-ui/react";
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
// import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import Chart from 'chart.js/auto';
import NoGoal from "./NoGoal";
import { useDispatch } from 'react-redux';
import { removeGoal, setGoal, toggleGoalCreated,  toggleLoading } from '../redux/currentGoalSlice';
import { useSelector } from 'react-redux';
import PieChart from './PieChart'
import { setGoalUserId } from '../redux/adminGoalUserIdSlice';
import { setGoalStats, clearGoalStats } from '../redux/adminOverviewSlice';
import EditGoal from './EditGoal'
export default function AdminCurrentGoal() {
  const canvas = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = useSelector(selectToken);
  // const [goals, setGoals] = useState([])
  const [users, setUsers] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const loading = useSelector((state) => state.adminCurrentGoal.loading);
  const isActive = useSelector((state) => state.adminCurrentGoal.isActive);
  const [chartInitialized, setChartInitialized] = useState(false);
  const router = useRouter();
  const toast = useToast()
  const dispatch = useDispatch();
  const rowHeight = 3; // Set the desired height for each row in vh
  const bg = useToken('colors', '#F6F6F6')
  const goalCreated = useSelector((state) => state.adminCurrentGoal.goalCreated);
  const handleDetails = (goalid, userid) => {
    dispatch(setGoalUserId({ goalId: goalid, userId: userid }));
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
      });
      const data = await res.json();
      const stat = await res.status;
      if (stat == 200) {
        dispatch(setGoal(data));
        // setLoading(false)
      }
      else
      {
        dispatch(toggleLoading());
      }
      // setLoading(false)
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  // useEffect(() => {
  //   setLoading(true);
  //   GetCurrentGoals().then(() => setLoading(false)); // Wait for data before setting loading to false
  // }, [goalCreated]);
  useEffect(() => {
    // Check if goals.goal is not 
    // if (!goals.goal) {
    //   setLoading(true);

    // }
    GetCurrentGoals()
    // .then(() => setLoading(false)); // Wait for data before setting loading to false

  }, [goalCreated]);
  let goals = useSelector((state) => state.adminCurrentGoal);

  const EndGoal = async () => {
    try {

      const data = await fetch(`${GoalEndPoint}/end-goal/${goals.goal._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await data.json();
      const status = await data.status;
      console.log(res, status);
      if (status === 200) {
        dispatch(removeGoal());
        GetCurrentGoals()
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
  const Drawer = {
    sizes: {
      menu: {
        dialog: { maxWidth: "31%" }
      }
    }
  };

  const customTheme = extendTheme({
    components: {
      Drawer
    }
  });
  const [percentage, setPercentage] = useState([])
  const GetGoalStats = async () => {
    try {
      const data = await fetch(`${GoalEndPoint}/stats/${goals.goal._id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const res = await data.json()
      const stats = await data.status
      console.log("goal stats", res, stats)
      if (stats == 200) {
        setPercentage(res)
        dispatch(setGoalStats(res));
      }
    } catch (error) {
      console.log(error)
    }
  }
  const goalStats = useSelector((state) => state.adminOverview.goalStats);
  useEffect(() => {
    if (goals.goal) {
      GetGoalStats().then(() => console.log(percentage));  // Only call GetGoalStats if goals.goal is available
    }
  }, [goalCreated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!goals.goal) {
    return <NoGoal title="No Current Goal" />;
  }
  console.log(goals)
  return (
    <>
      <div style={{ padding: "0 2.5rem", marginTop: "1rem" }}>
        <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" paddingLeft="15px" paddingRight="15px" >
          <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={calender} />
          {/* <FaCalendarAlt style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
          <Text marginLeft="0.5rem" color="#212529">Active Goal from</Text>
          <Text width="14rem" marginLeft="1.5rem" color="#212529">
            {new Date(goals.goal.startDate).toISOString().split('T')[0]} to {new Date(goals.goal.endDate).toISOString().split('T')[0]}
          </Text>
          <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={goal} />
          {/* <GoGoal style={{ marginLeft: "3rem" }} color="#03AF9F" /> */}
          <Text marginLeft="0.5rem" color="#212529">Goal Number</Text>
          <Text marginLeft="1.5rem" color="#212529">
            {goals.goal.users[0].goalNumber}
          </Text>
          {
            goals.goal.repeat &&
            <Text marginLeft="3rem" paddingTop="5px" color="#03AF9F" backgroundColor="#03af9e18" borderRadius="20px" fontWeight="500" height="34px" width="70px" textAlign="center">Repeat</Text>

          }
        </Flex>
        <Flex flexDirection="row" alignItems="center" fontSize="1rem" fontWeight="500" marginLeft="0.5rem" marginTop="0.7rem" paddingLeft="15px" paddingRight="15px" >
          <Image style={{ marginLeft: '0.25rem', width: '1rem', height: '1rem' }} src={trophy} />
          {/* <GiTrophyCup style={{ marginLeft: '0.25rem' }} color="#03AF9F" /> */}
          <Text marginLeft="0.5rem">Goal Reward</Text>
          <Text width="14rem" marginLeft="3.5rem">
            {goals.goal.reward}
          </Text>
          <Image style={{ marginLeft: '3rem', width: '1rem', height: '1rem' }} src={stats} />
          {/* <GiStairsGoal style={{ marginLeft: "2.8rem" }} color="#03AF9F" /> */}
          <Text marginLeft="0.5rem">Bonus Goal</Text>
          <Text marginLeft="2.4rem">
            {goals.goal.bonus}
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
              >
                <Tbody>
                  {goals.goal.users.map((user, index) => (
                    <Tr key={user.id} style={{ height: "4.5rem", boxShadow: '0px 4px 16px -4px rgba(0, 0, 0, 0.12)', borderRadius: "6px" }}>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px" }} >{`${user.firstName} ${user.lastName}`}</Td>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 20px", borderTop: "0.1px solid  #ccc", width: "20%", fontFamily: "poppinsreg", fontSize: "14px" }} >{user.lastUpdated == null ? "00-00-00000" : new Date(user.lastUpdated).toISOString().split('T')[0]}</Td>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "45%", fontFamily: "poppinsreg", fontSize: "12px" }} >{user.complete_percentage}% completed + <span style={{ color: "#03AF9F" }}>{user.bonus}% Bonus</span>
                        <Progress value={user.complete_percentage} size='md' />
                      </Td>
                      <Td bg={index % 2 === 0 ? `${bg + '!important'}` : "white"} style={{ padding: "0 16px", borderTop: "0.1px solid  #ccc", width: "15%" }} >
                        <Button onClick={() => handleDetails(goals.goal._id, user.userId)} fontSize="16px" fontFamily="poppinsmed" height="38px" border="1px solid #03AF9F" borderRadius="0.25rem" lineHeight="24px" fontWeight="400" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

            </div> </div>
          <Flex flexDirection="column" height="59vh" width="31%" backgroundColor="white" borderRadius="15px" border="1px solid #ccc">
            <h5 style={{ paddingLeft: "1.5rem",paddingBottom: "1rem", fontSize: "1.1rem", paddingTop: "1rem", fontFamily: "poppinsmed" }}>Team Overview</h5>
            <div id="container" style={{ height: '65%', width: "100%", marginTop: "5px", display: "flex", justifyContent: "center" }}>
              <PieChart
              // com={percentage.completed_percentage} 
              // bon={percentage.bonus_percentage} 
              // incom={percentage.incompleted_percentage}
              />
            </div>
            <Flex flexDirection="row" justifyContent="center" alignItems="center" marginTop="10px">
              <Button fontSize="15px" fontWeight="400" onClick={onOpen} borderRadius="0.25rem" height="38px" width="45%" border="1px solid #03AF9F" marginRight="10px" bg='transparent' color="#03AF9F" _hover={{ bg: '#03AF9F', color: "white" }}>
                Edit Goal
              </Button>
              <Button fontSize="15px" fontWeight="400" borderRadius="0.25rem" height="38px" width="45%" bg='#03AF9F' color="white" _hover={{ bg: '#0d7a79' }} onClick={() => EndGoal()}>
                End Goal
              </Button>   </Flex>
            <ChakraProvider theme={customTheme}>
              <EditGoal isOpen={isOpen} onClose={onClose} current={true} />
            </ChakraProvider>
          </Flex>
        </Flex>
      </div>

    </>
  );
}
