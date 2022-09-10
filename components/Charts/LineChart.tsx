import PN from "persian-number";
import React from "react";
import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJs,
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   CategoryScale,
// } from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';

// ChartJs.register(
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   CategoryScale
// );
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

const userData = [
  {
    id: 1,
    year: 2002,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2004,
    userGain: 30000,
    userLost: 513,
  },
  {
    id: 3,
    year: 2006,
    userGain: 65000,
    userLost: 500,
  },
  {
    id: 4,
    year: 2008,
    userGain: 50000,
    userLost: 400,
  },
  {
    id: 6,
    year: 2010,
    userGain: 88000,
    userLost: 400,
  },
  {
    id: 7,
    year: 2012,
    userGain: 75000,
    userLost: 400,
  },
  {
    id: 8,
    year: 2014,
    userGain: 79000,
    userLost: 400,
  },
  {
    id: 9,
    year: 2016,
    userGain: 50000,
    userLost: 400,
  },
  {
    id: 10,
    year: 2018,
    userGain: 65000,
    userLost: 400,
  },
  {
    id: 11,
    year: 2020,
    userGain: 25000,
    userLost: 400,
  },
  {
    id: 12,
    year: 2022,
    userGain: 70000,
    userLost: 400,
  },
];

const LineChart = () => {
  return (
    <div dir="ltr" className="py-14 bg-white">
      <Line
        height={2}
        width={4}
        data={{
          labels: userData.map((data) => PN.convertEnToPe(data.year)),
          datasets: [
            {
              fill: true,
              label: "تعداد بازدید",
              data: userData.map((data) => data.userGain),
              backgroundColor: ["transparent"],
              borderColor: "lightBlue",
              borderWidth: 5,
              pointBorderColor: "red",
              pointBorderWidth: 2,
              pointHoverBackgroundColor: "purple",
              tension: 0.4,
            },
          ],
        }}
        options={{
elements:{
  line:{
    fill: true
  }
} ,
          maintainAspectRatio: true,
          responsive: true,
          plugins: {
            filler: {
            propagate: true,
            },
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "نمودار میزان بازدید",
            },
          },

          scales: {
            y: {
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;