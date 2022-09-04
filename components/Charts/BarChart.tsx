import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
// import { Chart , registerables } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

// import { Chart } from 'react-chartjs-2'

// interface BarProps {
//     options: ChartOptions<'bar'>;
//     data: ChartData<'bar'>;
//   }

const userData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2010,
        userGain: 30000,
        userLost: 513
    },
    {
        id: 3,
        year: 2019,
        userGain: 65000,
        userLost: 500
    },
    {
        id: 1,
        year: 2001,
        userGain: 90000,
        userLost: 400
    },

]

const BarChart = () => {

  return (
    <div className='py-14'>
    <Line 
        height={400}
        width={400}
        data={{
            labels:userData.map(data => data.year),
            datasets: [{
                label: "Users Gained",
                data: userData.map(data => data.userGain)
            }]
        }}
        options= {{
            maintainAspectRatio: false
        }}
    />
        
    </div>
  )
}

export default BarChart