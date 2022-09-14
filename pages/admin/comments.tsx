import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import { MdDelete } from "react-icons/md";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import moment from "jalali-moment";
import PN from "persian-number";

const Comments: NextPage = () => {
  const [commentsData, setCommentsData] = useState(null);
  const [pagenumber, setPageNumber] = useState(1);
  const [updateComment, setUpdateComment] = useState(null);

  const fetchComments = () => {
    axiosInstance
      .get(`admin/comments/${pagenumber}`)
      .then((res) => setCommentsData(res.data))
  };

  useEffect(() => {
    fetchComments();
  }, [pagenumber, updateComment]);

  const COLUMNS = [
    {
      Header: "شناسه",
      accessor: "id",
      minWidth: 50,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "نظر",
      accessor: "comment",
      minWidth: 150,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "نام",
      minWidth: 300,
      accessor: (props) => `${props.user.firstname}  ${props.user.lastname}`,
    },
    {
      Header: "کد ملی",
      accessor: "user.username",
      minWidth: 200,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "تاریخ ثبت",
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
      accessor: (props) => props.id,
      Cell: (cell) => (
        <div className="">
          <button
            value={cell.accessor}
            onClick={() => handleDelete(cell.row.original.id)}
          >
        <span className="flex items-center bg-red-500 px-[4px] rounded text-white  hover:text-red-900 hover:bg-white ">

<MdDelete /> &nbsp; حذف
</span>
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (rowId) => {
    axiosInstance
      .get(`admin/remove/comment/${rowId}`)
      .then(() => setUpdateComment(rowId));
  };

  if (!commentsData) {
    return <div>loading . . .</div>;
  }
  return (
    <div className="pt-14 w-full ">
      {/* <Sidebar /> */}
      <BasicTable rowsdata={commentsData} columnsData={COLUMNS} />

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
  );
};

(Comments as any).layout = Admin;

export default Comments;
