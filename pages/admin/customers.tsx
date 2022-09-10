import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/basicTable/BasicTable'
import {  FA_COLUMNS } from "../../components/basicTable/columns"
import {  FA_DATA } from "../../components/basicTable/dataRow";
import Sidebar from '../../components/Sidebar/Sidebar';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Admin from '../../layouts/Admin'
import axiosInstance from '../../utils/axiosInstance';



const Costumers : NextPage = () => {
  const COLUMNS = [
    {
      Header: "عکس",
      accessor: "imageSource",
      minWidth: 150,
    },
    {
      Header: "شناسه",
      accessor: "id",
      minWidth: 150,
    },
    {
      Header: "کد کتاب",
      accessor: "privateid",
      minWidth: 150,
    },
    {
      Header: "کتاب",
      accessor: "bookName",
      minWidth: 150,
    },
    {
      Header: "نویسنده",
      accessor: "authorName",
      minWidth: 150,
    },
    {
      Header: "مترجم",
      accessor: "translatorName",
      minWidth: 150,
    },
    {
      Header: "دسته بندی",
      accessor: "category.categoryName",
      minWidth: 150,
    },
    {
      Header: "انتشارات",
      accessor: "publisherName",
      minWidth: 150,
    },
    {
      Header: "تعداد صفحات",
      accessor: "numberPage",
      minWidth: 150,
    },
    {
      Header: "نام قفسه",
      accessor: "shelfName",
      minWidth: 150,
    },
    {
      Header: "تاریخ ثبت در کتابخانه",
      accessor: "registeredAt",
      minWidth: 150,
    },
    {
      Header: "تاریخ ثبت در سیستم",
      accessor: "createdAt",
      minWidth: 150,
    },
    {
      Header: "وضعیت",
      accessor: "status",
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

  const [booksData, setBooksData] = useState(null)

  const fetchCart =  () => {
    axiosInstance.get('/admin/books/1')
    .then(res => setBooksData(res.data))
    console.log(booksData);
    
  }
  
  useEffect(()=> {
    fetchCart()
     },[])

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

(Costumers as any).layout = Admin;

export default Costumers
