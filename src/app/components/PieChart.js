"use client"
import Chart from 'chart.js/auto';
import React, { useRef, useEffect, useState } from 'react';
import { selectToken } from "../redux/authSlice";
import { useSelector } from 'react-redux';
import 'chartjs-plugin-datalabels';
export default function PieChart() {
let goals = useSelector((state) => state.adminCurrentGoal);
  const canvas = useRef();

 const pieChart = () => {
  console.log(goals.goal.goalStates)
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
            data: [goals.goal.goalStates.completed_percentage,goals.goal.goalStates.bonus_percentage,goals.goal.goalStates.incompleted_percentage],
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
        // animations : false,
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
        },
      },
    });
  };
  
  useEffect(() => {
    // console.log(goals)
    if(goals.goal)
    pieChart()
  },[])

  return (
      <canvas id='myChart' ref={canvas}></canvas>
  );
}
