import { NextPage } from 'next'
import React from 'react'
import BasicTable from '../../components/basicTable/BasicTable'
import {  FA_COLUMNS } from "../../components/basicTable/columns"
import {  FA_DATA } from "../../components/basicTable/dataRow";
import Sidebar from '../../components/Sidebar/Sidebar';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Admin from '../../layouts/Admin'



const costumers : NextPage = () => {
  const COLUMNS = [
    {
      Header: "نام",
      accessor: "first_name",
      minWidth: 150,
    },
    {
      Header: "نام خانوادگی",
      accessor: "last_name",
      minWidth: 150,
    },
    {
      Header: "شماره تماس",
      accessor: "phone_number",
      minWidth: 150,
    },
    {
      Header: "آدرس",
      accessor: "address.full_address",
      minWidth: 400,
    },
    {
      Header: "تاریخ",
      accessor: "date",
      minWidth: 150,
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

  const handleEdit = () => {
    console.log("edit button");
  };
  const handleDelete = () => {
    console.log("delete button");
  };

  
  return (
    <div className='pt-14'>
      {/* <Sidebar /> */}
        <BasicTable rowsdata={FA_DATA} columnsData={COLUMNS} />
    </div>
  )
}

(costumers as any).layout = Admin;

export default costumers
