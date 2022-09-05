import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';

ChartJs.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);



const userData = [
    {
        id: 1,
        year: 2002,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2004,
        userGain: 30000,
        userLost: 513
    },
    {
        id: 3,
        year: 2006,
        userGain: 65000,
        userLost: 500
    },
    {
        id: 4,
        year: 2008,
        userGain: 50000,
        userLost: 400
    },
    {
        id: 6,
        year: 2010,
        userGain: 88000,
        userLost: 400
    },
    {
        id: 7,
        year: 2012,
        userGain: 75000,
        userLost: 400
    },
    {
        id: 8,
        year: 2014,
        userGain: 79000,
        userLost: 400
    },
    {
        id: 9,
        year: 2016,
        userGain: 50000,
        userLost: 400
    },
    {
        id: 10,
        year: 2018,
        userGain: 65000,
        userLost: 400
    },
    {
        id: 11,
        year: 2020,
        userGain: 25000,
        userLost: 400
    },
    {
        id: 12,
        year: 2022,
        userGain: 70000,
        userLost: 400
    },

]

const LineChart = () => {

  return (
    <div className='py-14'>
    <Line
        height={3}
        width={5}
        data={{
            labels:userData.map(data => data.year),
            datasets: [{
                label: "Users Gained",
                data: userData.map(data => data.userGain),
                backgroundColor: ["transparent"],
                borderColor:"lightBlue",
                borderWidth: 5,
                pointBorderColor: "red",
                pointBorderWidth:2,
                pointHoverBackgroundColor: "purple",
                tension:.4,
                fill: true,
            }]
        }}
        options= {{
            maintainAspectRatio: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            },
            
        }}
       
    />
        
    </div>
  )
}

export default LineChart