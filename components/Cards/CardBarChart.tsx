import React, { MutableRefObject, useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js";

// interface config {
//   type: string;
//   data: {
//     labels: string[];
//     datasets: {
//       label: string;
//       backgroundColor: string;
//       borderColor: string;
//       data: number[];
//       fill: boolean;
//       barThickness: number;
//     }[];
//   };
//   options: {
//     maintainAspectRatio: boolean;
//     responsive: boolean;
//     title: object;
//     tooltips: object;
//     hover: object;
//     legend: object;
//     scales: object;
//   };
// }

const CardBarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>();
  console.log(chartRef);

  useEffect(() => {
    console.log(chartRef.current);

    let config: ChartConfiguration = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: String(new Date().getFullYear()),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: String(new Date().getFullYear() - 1),
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = chartRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, config);
  }, []);

  // const renderChart = (
  //   ctx: CanvasRenderingContext2D,
  //   config: ChartConfiguration
  // ) => {
  //   return new Chart(ctx, config);
  // };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas ref={chartRef} id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBarChart;
