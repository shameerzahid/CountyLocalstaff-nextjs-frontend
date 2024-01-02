"use client"
import Chart from 'chart.js/auto';
import React, { useRef, useEffect, useState } from 'react';
import GoalEndPoint from '../constants/goalurls';
import { selectToken } from "../redux/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import 'chartjs-plugin-datalabels';
import { setGoalStats } from '../redux/adminOverviewSlice';
export default function PieChart({com,bon,incom}) {
const token = useSelector(selectToken);
const dispatch = useDispatch()
let goals = useSelector((state) => state.adminCurrentGoal);
  const canvas = useRef();
  const [comp, setComp] = useState("")
  const [percentage, setPercentage] = useState([])
  // const GetGoalStats = async () => {
  //   try {
  //     const data =  await fetch(`${GoalEndPoint}/stats/${goals.goal._id}`,{
  //       method : "GET",
  //       headers: {
  //         "Content-type" : "application/json",
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     const res = await data.json()
  //     setPercentage(res)
  //     dispatch(setGoalStats(res));
  //     console.log(goalId)
  //     console.log(percentage)
  //     pieChart()
  //   } catch (error) {
  //     console.log(error)
  //   }}
//  useEffect(() => {
//   GetGoalStats()
//  },[])
 const goalStats = useSelector((state) => state.adminOverview.goalStats);
 const pieChart = () => {
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
            data: [goalStats.completed_percentage,goalStats.bonus_percentage,goalStats.incompleted_percentage],
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
        
        plugins: {
            
          legend: {
            position: 'bottom',
            labels: {
              padding: 14,
                font: {
                  size: 10, // Adjust the font size for legends
                },
                boxWidth: 15,
              },
          },
          title: {
            display: false,
          },
          // datalabels: {
          //   formatter: (value, ctx) => {
      
          //     let sum = ctx.dataset._meta[0].total;
          //     let percentage = (value * 100 / sum).toFixed(2) + "%";
          //     return percentage;
      
          //   },
          //   color: '#fff',
          // }
        },
      },
    });
  };
  
  useEffect(() => {
    if(goalStats)
    pieChart()
  console.log("run ++")
  },[goalStats])

  return (
      <canvas id='myChart' ref={canvas}></canvas>
  );
}
