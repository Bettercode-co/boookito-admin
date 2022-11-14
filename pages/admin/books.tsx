/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import moment from "jalali-moment";
import PN from "persian-number";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import BooksModal from "../../components/modals/BooksModal";
import { getCookie } from "cookies-next";
import EditBooksModal from "../../components/modals/EditBookModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = getCookie("accessToken");

const notifyError = (err) =>
  toast.error(err, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });

const Books: NextPage = () => {
  const [booksData, setBooksData] = useState(null);
  const [pagenumber, setPageNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [rowDataId, setRowDataId] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const moadalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchBooks = () => {
    axiosInstance
      .get(`admin/books/${pagenumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBooksData(res.data.result));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
    if(searchInputValue){
      searchFetchBook(searchInputValue)
    }else{
      fetchBooks()
    }}, 2000)
    return () => clearTimeout(timer);
  }, [pagenumber, isModalOpen, isEditModalOpen, isDeleteModalOpen, searchInputValue]);

  const searchFetchBook = (value) => {
    if(searchInputValue){
      axiosInstance.get(`admin/searchbooks/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setBooksData(res.data.result))
      .catch(() => notifyError('خطا در جست و جوی کتاب'))
    }
  }

  const COLUMNS = [
    {
      Header: "عکس",
      accessor: "imageSource",
      minWidth: 100,
      Cell: (cell) => (
        <div>
          <img src={cell.value} alt="book" />
        </div>
      ),
    },
    {
      Header: "کد کتاب",
      accessor: "id",
      minWidth: 150,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
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
      Cell: (cell) => (
        <div dir="ltr">
          {cell.value.map((auth) => {
            return <div key={auth}>{(auth === "" && cell.value.length < 2) ? "ندارد" : auth}</div>;
          })}
        </div>
      ),
    },
    {
      Header: "مترجم",
      accessor: "translatorName",
      minWidth: 200,
      Cell: (cell) => (
        <div dir="ltr">
          {cell.value.map((auth) => {
            return <div key={auth}>{(auth === "" && cell.value.length < 2) ? "ندارد" : auth}</div>;
          })}
        </div>
      ),
    },
    {
      Header: "دسته بندی",
      accessor: "category.categoryName",
      minWidth: 250,
    },
    {
      Header: "انتشارات",
      accessor: "publisherName",
      minWidth: 200,
    },
    {
      Header: "تعداد موجودی",
      accessor: "totalEntity",
      minWidth: 200,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "تعداد صفحات",
      accessor: "numberPage",
      minWidth: 200,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "نام قفسه",
      accessor: "shelfName",
      minWidth: 150,
      Cell: (cell) => (
        <div dir="ltr">{PN.convertEnToPe(cell.value.toUpperCase())}</div>
      ),
    },
    {
      Header: "نام کتابخانه",
      accessor: "library.libraryName",
      minWidth: 270,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "تاریخ ثبت در کتابخانه",
      accessor: "registeredAt",
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
        <div className="flex items-center justify-between  gap-3">
          <button
            value={cell.accessor}
            className="felx items-center min-w-max"
            onClick={() => handleEdit(cell.row.original)}
          >
            <span className="flex items-center bg-blue-500 px-[4px] rounded text-white  hover:text-blue-900 hover:bg-white">
              <RiEditFill /> &nbsp; ویرایش
            </span>
          </button>
          <button
            value={cell.accessor}
            className="felx items-center min-w-max bg-red-500 rounded text-white  hover:text-red-900 hover:bg-white disabled:bg-gray-300 disabled:hover:text-gray-500 disabled:cursor-not-allowed"
            onClick={() => handleDelete(cell.row.original)}
          >
            <span className="flex items-center  px-[4px] ">
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

  if (!booksData) {
    return (
      <div className="h-[80vh] w-full mx-auto flex items-center justify-center">
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
      </div>
    );
  }
  return (
    <div className="pt-14">
      <div className="fixed top-0 right-0 z-50">
        <BooksModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <div className="fixed top-0 right-0 z-50">
        <EditBooksModal
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
          fetchUrl="admin/deletebook/"
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
      <div className="searchBarContainer mt-8 lg:mt-0 relative flex  gap-2 ">
          <span className="pr-0 lg:pr-10 self-center text-3xl"><RiSearchLine /> </span>
          <input
            className='mt-4 h-10 rounded-lg w-full lg:w-96 border-slate-400 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent'
            type="text"
            value={searchInputValue}
            onChange={e => setSearchInputValue(e.target.value)}
          />
      </div>
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
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
      />
    </div>
  );
};

(Books as any).layout = Admin;

export default Books;
