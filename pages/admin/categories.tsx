import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import CategoryModal from "../../components/modals/CategoryModal";
import { getCookie } from "cookies-next";

//react icons
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import EditCategoryModal from "../../components/modals/EditCategoryModal";
import DeleteModal from "../../components/modals/DeleteModal";
import SubCategoryModal from "../../components/modals/SubCategoryModal";
import LoadingComponent from "../../components/spinner/Loading";

const token = getCookie("accessToken");

const Categories: NextPage = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenSub, setIsModalOpenSub] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [rowDataId, setRowDataId] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const moadalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const moadalHandlerSub = () => {
    setIsModalOpenSub(!isModalOpenSub);
  };

  const fetchOrders = () => {
    axiosInstance
      .get(`admin/subcategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => { 
        setCategoriesData(res.data);
        console.log({subcategory: res.data})
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [isModalOpen, isEditModalOpen, isDeleteModalOpen, isModalOpenSub]);

  const COLUMNS = [
    {
      Header: "نام دسته بندی",
      accessor: "category.categoryName",
      minWidth: 50,
    },
    {
      Header: "نام زیر دسته بندی",
      accessor: "name",
      minWidth: 50,
    },
    {
      Header: "عملیات",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex items-center justify-center gap-3">
          <button
            value={cell.accessor}
            className="felx items-center min-w-max"
            onClick={() => handleEdit(cell.row.original)}
          >
            <span className="flex items-center bg-green-600 px-[4px] rounded text-white  hover:text-blue-900 hover:bg-white">
              <RiEditFill /> &nbsp; ویرایش
            </span>
          </button>
          <button
            value={cell.accessor}
            className="felx items-center min-w-max  cursor-pointer"
            onClick={() => handleDelete(cell.row.original)}
          >
            <span className="flex items-center bg-red-500 px-[4px] rounded text-white  hover:text-red-900 hover:bg-white ">
              <MdDelete /> &nbsp; حذف
            </span>
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (rowData) => {
    setRowDataId(rowData);
    setIsEditModalOpen(true);
  };
  const handleDelete = (rowData) => {
    setRowDataId(rowData);
    setIsDeleteModalOpen(true);
  };

  if (!categoriesData) {
    return (
     <LoadingComponent/>
    );
  }
  return (
    <div className="pt-14">
      <div className="fixed top-0 right-0 z-50">
        <CategoryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <div className="fixed top-0 right-0 z-50">
        <SubCategoryModal
          isModalOpen={isModalOpenSub}
          setIsModalOpen={setIsModalOpenSub}
        />
      </div>
      <div className="fixed top-0 right-0 z-50">
        <EditCategoryModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          rowDataId={rowDataId}
        />
      </div>
      <div className="fixed top-0 right-0 z-50">
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          rowData={rowDataId}
          fetchUrl="admin/subcategories/"
        />
      </div>
      {/* <SearchBox /> */}
      <div className=" flex gap-3 justify-end">
        <button
          onClick={moadalHandler}
          className=" left-6 flex items-center justify-center p-4 rounded bg-green-600 text-white hover:bg-green-700 transition "
        >
          <IoIosAddCircleOutline />  اضافه کردن دسته اصلی
        </button>
        <button
          onClick={moadalHandlerSub}
          className=" left-6 flex items-center justify-center p-4 rounded bg-green-600 text-white hover:bg-green-700 transition "
        >
          <IoIosAddCircleOutline />  اضافه کردن زیر دسته 
        </button>
      </div>
      <BasicTable rowsdata={categoriesData} columnsData={COLUMNS} />
    </div>
  );
};

(Categories as any).layout = Admin;
export default Categories;
