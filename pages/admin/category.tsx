import { NextPage } from "next";
import React from "react";
import BasicTable from "../../components/basicTable/BasicTable";
// import { COLUMNS } from "../components/basicTable/columns"
import { DATA, FA_DATA } from "../../components/basicTable/dataRow";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import Admin from "../../layouts/Admin";

const category: NextPage = () => {
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
      Header: "عملیات",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex gap-5">
          <button value={cell.accessor} onClick={handleEdit}>
            <span className="flex items-baseline text-blue-900">
              ویرایش {"   "} <RiEditFill />
            </span>
          </button>
          <button value={cell.accessor} onClick={handleDelete}>
            <span className="flex items-baseline text-red-900">
              حذف {"   "} <MdDelete />
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
    <div className="w-11/12 mx-auto relative">
      <div className="text-left">
        <button className="mt-5 left-6   w-32 h-10 rounded bg-cyan-700 text-white hover:bg-cyan-600 transition">
          اضافه کردن
        </button>
      </div>
      <BasicTable rowsdata={FA_DATA} columnsData={COLUMNS} />
    </div>
  );
};

(category as any).layout = Admin;

export default category;
