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
import Image from 'next/image';
import moment from 'jalali-moment';
import PN from "persian-number";


const statusHandler = (value) => {
  switch(value){
    case "RESERVED" :
      return (
        <div className='text-green-700'>
          رزرو شده
        </div>
        )
  }
}


const Books : NextPage = () => {
  
  const [booksData, setBooksData] = useState(null)
  const [pagenumber, setPageNumber] = useState(1)
  

  const fetchBooks = () => {
    axiosInstance.get(`admin/books/${pagenumber}`)
    .then(res => setBooksData(res.data.result))
    .then(res => console.log(booksData))
  }
  
  useEffect(()=> {
    fetchBooks()
     },[pagenumber])

  const COLUMNS = [
    {
      Header: "عکس",
      accessor: "imageSource",
      minWidth: 100,
      Cell: (cell) => (
        <div>
          <img src={cell.value} alt='book' />
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
      Header: "کد کتاب",
      accessor: "privateId",
      minWidth: 150,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(cell.value)}
        </div>
        )
    },
    {
      Header: "کتاب",
      accessor: "bookName",
      minWidth: 300,
    },
    {
      Header: "نویسنده",
      accessor: "authorName",
      minWidth: 200,
    },
    {
      Header: "مترجم",
      accessor: "translatorName",
      minWidth: 200,
    },
    {
      Header: "دسته بندی",
      accessor: "category.categoryName",
      minWidth: 150,
    },
    {
      Header: "انتشارات",
      accessor: "publisherName",
      minWidth: 200,
    },
    {
      Header: "تعداد صفحات",
      accessor: "numberPage",
      minWidth: 200,
    },
    {
      Header: "نام قفسه",
      accessor: "shelfName",
      minWidth: 150,
    },
    {
      Header: "نام قفسه",
      accessor: "library.libraryName",
      minWidth: 270,
    },
    {
      Header: "تاریخ ثبت در کتابخانه",
      accessor: "registeredAt",
      minWidth: 250,
      Cell: (cell) => (
        <div dir='ltr'>  
          {PN.convertEnToPe(moment( cell.value, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY/MM/DD HH:mm:ss'))}
        </div>
        )
    },
    {
      Header: "تاریخ ثبت در سیستم",
      accessor: "createdAt",
      minWidth: 250,
      Cell: (cell) => (
        <div dir='ltr'>
          {PN.convertEnToPe(moment( cell.value, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY/MM/DD HH:mm:ss'))}
        </div>
        )
    },
    {
      Header: "وضعیت",
      accessor: "status",
      minWidth: 100,
      Cell: (cell) => (
        statusHandler(cell.value)
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

  if(!booksData){
    return <div>loading . . .</div>
  }
  return (
    <div className='pt-14'>
      {/* <Sidebar /> */}
        <BasicTable rowsdata={booksData} columnsData={COLUMNS} />
        
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
  )
}

(Books as any).layout = Admin;

export default Books
