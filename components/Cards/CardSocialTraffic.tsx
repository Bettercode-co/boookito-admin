import React, { useEffect, useState } from "react";
import DashboardTable from "../dashboardTable/dashboardTable";
import PN from "persian-number";
import moment from 'jalali-moment';
import axiosInstance from "../../utils/axiosInstance";
import Link from "next/link";
import { getCookie } from "cookies-next";

const token = getCookie('accessToken')

export default function CardSocialTraffic() {
  const [lastComments, setLastComments] = useState(null)
  useEffect(() => {
    fetchLastComments()
  },[])
  const fetchLastComments = () => {
    axiosInstance.get('admin/statistics', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setLastComments(res.data.lastcomments)) 
    .then(res => console.log(lastComments))
  }

  const COLUMNS = [
    {
      Header: "نام",
      accessor: props => `${props.user.firstname} ${props.user.lastname}`,
      minWidth: 50,

    },

    {
      Header: "نظر",
      accessor: 'comment',
      minWidth: 50,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },   
  ];

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                آخرین نظرات
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-left">
              <Link href='/admin/comments' >
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                مشاهده نظرات
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          {lastComments && <DashboardTable rowsdata={lastComments} columnsData={COLUMNS} />}
        </div>
      </div>
    </>
  );
}
