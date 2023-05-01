/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import moment from "jalali-moment";
import PN from "persian-number";
import { getCookie } from "cookies-next";

//react icons
import { RiEditFill, RiSearchLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import { IoIosAddCircleOutline } from "react-icons/io";
import UserModal from "../../components/modals/UserModal";

const statusHandler = (value: string) => {
  switch (value) {
    case "PENDING":
      return <div className="text-orange-700">درانتظار</div>;
    case "ACTIVE":
      return <div className="text-green-700">فعال</div>;
  }
};

const rulebaseHandler = (value: string) => {
  switch (value) {
    case "STUDENT":
      return <div className="text-green-700">دانشجو</div>;
  }
};
const token = getCookie("accessToken");

const Users: NextPage = () => {
  const [usersData, setUsersData] = useState(null);
  const [pagenumber, setPageNumber] = useState<number>(1);
  const [searchInputValue, setSearchInputValue] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchUsers = () => {
    axiosInstance
      .get(`admin/users/${pagenumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsersData(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, [pagenumber]);

  const fetchSearch = () => {
    axiosInstance.get(`admin/user/search/${searchInputValue}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUsersData(res.data)
    })
  }

  useEffect(() => {
    if (searchInputValue) {
    fetchSearch()
    }
  }, [searchInputValue])

  const COLUMNS = [
    {
      Header: "عکس",
      accessor: "avatarSource",
      minWidth: 100,
      Cell: (cell) => (
        <div>
          <img className="rounded-full scale-90" src={cell.value} alt="book" />
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
      Header: "کدملی",
      accessor: "username",
      minWidth: 150,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "نام",
      accessor: "firstname",
      minWidth: 150,
    },
    {
      Header: "نام‌خانوادگی",
      accessor: "lastname",
      minWidth: 200,
    },
    {
      Header: "شماره کاربر (شماره دانشجویی)",
      accessor: "studentId",
      minWidth: 250,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "شماره تماس",
      accessor: "phoneNumber",
      minWidth: 250,
      Cell: (cell) => {
        return cell.value ? (
          <div>{PN.convertEnToPe(cell.value)}</div>
        ) : (
          <div>ندارد</div>
        );
      },
    },
    {
      Header: "نام کاربری شبکه اجتماعی",
      accessor: "usernameSocial",
      minWidth: 250,
      Cell: (cell) => {
        return cell.value ? (
          <div>{PN.convertEnToPe(cell.value)}</div>
        ) : (
          <div>ندارد</div>
        );
      },
    },
    {
      Header: "مقطع",
      accessor: "level",
      minWidth: 200,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "وضعیت کاربر",
      accessor: "userStatus",
      minWidth: 200,
      Cell: (cell) => <div dir="ltr">{statusHandler(cell.value)}</div>,
    },
    {
      Header: "نوع کاربر",
      accessor: "ruleBase",
      minWidth: 270,
      Cell: (cell) => <div dir="ltr">{rulebaseHandler(cell.value)}</div>,
    },
    {
      Header: "نام دانشکده",
      accessor: "Libraries.libraryName",
      minWidth: 270,
    },
    {
      Header: "ایمیل",
      accessor: "email",
      minWidth: 270,
      Cell: (cell) => <div dir="ltr">{cell.value ? cell.value : "ندارد"}</div>,
    },
    {
      Header: "تاریخ عضویت",
      accessor: "createdAt",
      minWidth: 250,
      Cell: (cell) => (
        <div dir="ltr">
          {PN.convertEnToPe(
            moment(cell.value, "YYYY/MM/DD")
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
        <div className="flex items-center gap-3">
          <button
            value={cell.accessor}
            className="felx items-center min-w-max"
            onClick={handleEdit}
            disabled
          >
            <span className="flex items-center bg-blue-500 px-[4px] rounded text-white  hover:text-blue-900 hover:bg-white disabled:cursor-not-allowed">
              <RiEditFill /> &nbsp; ویرایش
            </span>
          </button>
          <button
            value={cell.accessor}
            className="felx items-center min-w-max  cursor-pointer"
            onClick={handleDelete}
            disabled
          >
            <span className="flex items-center bg-red-500 px-[4px] rounded text-white  hover:text-red-900 hover:bg-white disabled:cursor-not-allowed ">
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

  if (!usersData) {
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
    <div className=" mx-auto pt-5">
      <div className="fixed top-0 right-0 z-50">
        <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <div className="fixed top-0 right-0 z-50">
        {/* <EditUserModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          rowDataId={rowDataId}
        /> */}
      </div>
      <div className=" flex justify-end mt-5">
        <button
          onClick={() => { setIsModalOpen(true)}}
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
      <BasicTable rowsdata={usersData} columnsData={COLUMNS} />
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

(Users as any).layout = Admin;

export default Users;
