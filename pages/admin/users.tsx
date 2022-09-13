import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
// import { COLUMNS } from "../components/basicTable/columns"
import { DATA, FA_DATA } from "../../components/basicTable/dataRow";
import moment from 'jalali-moment';
import PN from "persian-number";

//react icons
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";

const statusHandler = (value) => {
  switch(value){
    case "PENDING" :
      return (
        <div className='text-orange-700'>
           درانتظار
        </div>
        )
  }
}

const rulebaseHandler = (value) => {
  switch(value){
    case "STUDENT" :
      return (
        <div className='text-green-700'>
           دانشجو
        </div>
        )
  }
}

const Users: NextPage = () => {
  const [usersData, setUsersData] = useState(null)
  const [pagenumber, setPageNumber] = useState(1)


  const fetchUsers = () => {
    axiosInstance.get(`admin/users/${pagenumber}`)
    .then(res => setUsersData(res.data))
    .then(res => console.log(usersData))
  }
  
  useEffect(()=> {
    fetchUsers()
     },[pagenumber])



  const COLUMNS = [
    {
      Header: "عکس",
      accessor: "avatarSource",
      minWidth: 100,
      Cell: (cell) => (
        <div>
          <img className="rounded-full scale-90" src={cell.value} alt='book' />
        </div>
        )
    },
    {
      Header: "شناسه",
      accessor: "id",
      minWidth: 50,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "کدملی",
      accessor: "username",
      minWidth: 150,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "نام",
      accessor: "firstname",
      minWidth: 150,
    },
    {
      Header: "نام‌خانوادگی",
      accessor: "lastname",
      minWidth: 200,
    },
    {
      Header: "شماره کاربر (شماره دانشجویی)",
      accessor: "studentId",
      minWidth: 250,
      Cell: (cell) => (
        <div dir='ltr'>
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "شماره تماس",
      accessor: "phoneNumber",
      minWidth: 250,
    },
    {
      Header: "نام کاربری شبکه اجتماعی",
      accessor: "usernameSocial",
      minWidth: 250,
    },
    {
      Header: "مقطع",
      accessor: "level",
      minWidth: 200,
      Cell: (cell) => (
        <div dir='ltr'>
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "وضعیت کاربر",
      accessor: "userStatus",
      minWidth: 200,
      Cell: (cell) => (
        <div dir='ltr'>
          {statusHandler(cell.value)}
        </div>
        )
    },
    {
      Header: "نوع کاربر",
      accessor: "ruleBase",
      minWidth: 270,
      Cell: (cell) => (
        <div dir='ltr'>
          {rulebaseHandler(cell.value)}
        </div>
        )
    },
    {
      Header: "نام دانشکده",
      accessor: "Libraries.libraryName",
      minWidth: 270,
    },
    {
      Header: "ایمیل",
      accessor: "email",
      minWidth: 270,
      Cell: (cell) => (
        <div dir='ltr'>
          {cell.value ? cell.value : "ندارد"}
        </div>
        )
    },
    {
      Header: "تاریخ عضویت",
      accessor: "createdAt",
      minWidth: 250,
      Cell: (cell) => (
        <div dir='ltr'>
          {PN.convertEnToPe(moment( cell.value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD HH:mm:ss'))}
        </div>
        )
    },

    {
      Header: "عملیات",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex items-center justify-between  gap-3">
          <button value={cell.accessor} onClick={handleEdit}>
            <span className="flex items-end  text-blue-900 hover:text-blue-600">
                <RiEditFill /> &nbsp; ویرایش
            </span>
          </button>
          <button value={cell.accessor} onClick={handleDelete} >
            <span className="flex items-end   text-red-900 hover:text-red-600">
                 <MdDelete /> &nbsp; حذف
            </span>
          </button>
        </div>
      ),
    },

  ];


  const handleEdit = (e) => {
    console.log("edit button");
  };
  const handleDelete = () => {
    console.log("delete button");
  };


  if(!usersData){
    return <div>loading . . .</div>
  }
  return (
    <div className=" mx-auto">
      {/* <div className=" flex justify-end">
        <button className="mt-5 left-6 flex items-center justify-center   w-32 h-10 rounded bg-cyan-700 text-white hover:bg-cyan-600 transition ">
           <IoIosAddCircleOutline /> {" "}  اضافه کردن 
        </button>
      </div> */}
      <BasicTable rowsdata={usersData} columnsData={COLUMNS}  />
      <div className="text-center pb-8">
        <button
          className="w-20 py-1 rounded-md text-slate-700 cursor-pointer bg-violet-300 mx-5 mt-3 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => setPageNumber(pagenumber + 1)}
        >
          بعد
        </button>
        <button
          className="w-20 py-1 rounded-md text-slate-700 cursor-pointer bg-violet-300 mx-5 mt-3 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          onClick={() => setPageNumber(pagenumber - 1)}
          disabled={pagenumber <= 1}
        >
          قبل
        </button>
        {/* <span className="mx-5 mt-3 text-slate-700">
          صفحه : {PN.convertEnToPe(pageIndex + 1)} از {PN.convertEnToPe(pageOptions.length)}
        </span> */}
      </div>
    </div>
  );
};

(Users as any).layout = Admin;

export default Users;
