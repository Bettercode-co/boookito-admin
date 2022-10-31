import React, { useEffect, useState } from "react";
import PN from "persian-number";
import moment from 'jalali-moment';
import axiosInstance from "../../utils/axiosInstance";
import DashboardTable from "../dashboardTable/dashboardTable";
import Link from "next/link";
import { getCookie } from "cookies-next";


const token = getCookie('accessToken')


export default function CardPageVisits() {
  const [lastOrders, setLastOrders] = useState([])
  useEffect(() => {
    fetchLastOrders()
  },[])
  const fetchLastOrders = () => {
    axiosInstance.get('admin/statistics', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setLastOrders(res.data.lastorders)) 
  }



  const COLUMNS = [
    {
      Header: "نام کتاب",
      accessor: "book.bookName",
      minWidth: 50,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "کد کتاب",
      accessor: "book.id",
      minWidth: 50,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "نام ",
      accessor: props =>  `${props.user.firstname}  ${props.user.lastname}`,
      minWidth: 50,

    },

    {
      Header: "کد ملی کاربر",
      accessor: "user.username",
      minWidth: 150,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },

    
    {
      Header: "تاریخ ثبت",
      accessor: "createdAt",
      minWidth: 250,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(moment( cell.value, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY/MM/DD HH:mm:ss'))}
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
                سفارشات در انتظار تایید
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-left">
              <Link href='/admin/orders' >
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-left"
                type="button"
              >
                مشاهده تمامی سفارشات
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          {lastOrders && <DashboardTable rowsdata={lastOrders} columnsData={COLUMNS} /> }
        </div>
      </div>
    </>
  );
}
