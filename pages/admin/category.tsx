import { NextPage } from "next";
import React from "react";
import BasicTable from "../../components/basicTable/BasicTable";
// import { COLUMNS } from "../components/basicTable/columns"
import { DATA } from "../../components/basicTable/dataRow";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import Admin from "../../layouts/Admin";

const category: NextPage = () => {
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
      Footer: "ID",
    },
    {
      Header: "Price",
      accessor: "price",
      Footer: "Price",
    },
    {
      Header: "Title",
      accessor: "title",
      Footer: "Title",
    },
    {
      Header: "Description",
      accessor: "description",
      Footer: "Description",
    },
    {
      Header: "Category",
      accessor: "category",
      Footer: "Category",
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex gap-5">
          <button value={cell.accessor} onClick={handleEdit}>
            <span className="flex items-baseline text-blue-900">
              Edit {"   "} <RiEditFill />
            </span>
          </button>
          <button value={cell.accessor} onClick={handleDelete}>
            <span className="flex items-baseline text-red-900">
              Delete {"   "} <MdDelete />
            </span>
          </button>
        </div>
      ),
    },

  ];

  const handleEdit = (e) => {
    console.log("edit button");
  };
  const handleDelete = (e) => {
    console.log("delete button");
  };

  return (
    <div className="w-11/12 mx-auto relative">
      <div className="text-left">
        <button className="mt-5 left-6  absolute w-32 h-10 rounded bg-cyan-700 text-white">
          add category
        </button>
      </div>
      <BasicTable rowsdata={DATA} columnsData={COLUMNS} />
    </div>
  );
};

(category as any).layout = Admin;

export default category;
