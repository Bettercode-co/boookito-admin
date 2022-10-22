import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import moment from "jalali-moment";
import PN from "persian-number";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const statusHandler = (value) => {
  switch (value) {
    case "PUBLISH":
      return <div className="text-green-700">منتشر شده</div>;
  }
};

const Bookgram: NextPage = () => {
  const [pagenumber, setPageNumber] = useState<number>(1);
  const [postsData, setPostsData] = useState(null);
  const [updatePosts, setUpdatePosts] = useState(null);


  const fetchPosts = () => {
    axiosInstance
      .get(`admin/posts/${pagenumber}`)
      .then((res) => setPostsData(res.data.result));
  };

  useEffect(() => {
    fetchPosts();
  }, [pagenumber, updatePosts]);


  const COLUMNS = [
    {
      Header: "تصویر",
      accessor: "mediaSource",
      minWidth: 100,
      Cell: (cell) => (
        <div>
          <img src={cell.value} className='rounded-lg' alt="book" />
        </div>
      ),
    },
    {
      Header: "شناسه",
      accessor: "id",
      minWidth: 50,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "عنوان",
      accessor: "title",
      minWidth: 150,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "وضعیت",
      accessor: "postStatus",
      minWidth: 100,
      Cell: (cell) => statusHandler(cell.value),
    },
    {
      Header: "نام",
      accessor: props => `${props.user.firstname} ${props.user.lastname}`,
      minWidth: 300,
    },
    {
      Header: "تعداد لایک",
      accessor: "_count.likes",
      minWidth: 200,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,

    },
    {
      Header: "تاریخ ثبت در سیستم",
      accessor: "createdAt",
      minWidth: 250,
      Cell: (cell) => (
        <div dir="ltr">
          {PN.convertEnToPe(
            moment(cell.value, "YYYY/MM/DD HH:mm:ss")
              .locale("fa")
              .format("YYYY/MM/DD HH:mm:ss")
          )}
        </div>
      ),
    },


    {
      Header: "عملیات",
      accessor: "action",
      Cell: (cell) => (
        <div className="">
          <button value={cell.accessor} onClick={() => handleDelete(cell.row.original.id)}>
            <span className="flex items-center bg-red-500 px-[4px] rounded text-white  hover:text-red-900 hover:bg-white">
              <MdDelete /> &nbsp; حذف
            </span>
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (rowId) => {
    axiosInstance
      .get(`admin/remove/post/${rowId}`)
      .then(() => setUpdatePosts(rowId));
  };

  if (!postsData) {
    return <div>loading . . .</div>;
  }
  return (
    <>
          <div className=" mx-auto ">
      <BasicTable rowsdata={postsData} columnsData={COLUMNS} />
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
      </div>
    </div>
    </>
  );
};

(Bookgram as any).layout = Admin;

export default Bookgram;
