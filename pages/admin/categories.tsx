import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import CategoryModal from "../../components/modals/CategoryModal";

//react icons
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";



const Categories: NextPage = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moadalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchOrders = () => {
    axiosInstance
      .get(`admin/categories`)
      .then((res) => setCategoriesData(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const COLUMNS = [
    {
      Header: "نام دسته بندی",
      accessor: "categoryName",
      minWidth: 50,
    },
    {
      Header: "عملیات",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex items-center gap-3">
          <button value={cell.accessor} className="felx items-center min-w-max" onClick={handleEdit}>
          <span className="flex items-center bg-blue-500 px-[4px] rounded text-white  hover:text-blue-900 hover:bg-white">

              <RiEditFill /> &nbsp; ویرایش
            </span>
          </button>
          <button value={cell.accessor} className="felx items-center min-w-max  cursor-pointer"  onClick={handleDelete}>
          <span className="flex items-center bg-red-500 px-[4px] rounded text-white  hover:text-red-900 hover:bg-white ">

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

  if (!categoriesData) {
    return <div className="h-[80vh] w-full mx-auto flex items-center justify-center">
    <svg
      className="animate-spin h-14 w-14 mx-auto text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>;
  }
  return (
    <div className="pt-14">
      <div className="fixed top-0 right-0 z-50">
        <CategoryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <div className=" flex justify-end">
        <button
          onClick={moadalHandler}
          className=" left-6 flex items-center justify-center   w-32 h-10 rounded bg-cyan-700 text-white hover:bg-cyan-600 transition "
        >
          <IoIosAddCircleOutline /> اضافه کردن
        </button>
      </div>
      <BasicTable rowsdata={categoriesData} columnsData={COLUMNS} />
    </div>
  );
};

(Categories as any).layout = Admin;
export default Categories;