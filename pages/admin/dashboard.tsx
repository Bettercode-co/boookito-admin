import React, { useEffect, useState } from "react";
import CardBarChart from "../../components/Cards/CardBarChart";
import CardLineChart from "../../components/Cards/CardLineChart";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import LineChart from "../../components/Charts/LineChart";
import axiosInstance from "../../utils/axiosInstance";

// layout for page

import Admin from "../../layouts/Admin";



const Dashboard: React.FC = () => {
  // const  fetchCartData = axiosInstance.get("admin/statistics")
  // .then(res => console.log(res.data))
  // .catch(err => console.log(err))



  return (
    <>
      <div className="flex flex-wrap">
        {/* <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">

          <LineChart />
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <CardBarChart />
        </div> */}
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
};
(Dashboard as any).layout = Admin;

export default Dashboard;
