import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/basicTable/BasicTable";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";
import moment from "jalali-moment";
import PN from "persian-number";
import OrdersModal from "../../components/modals/OrdresModal";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react icons
import { MdDelete, MdDone } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgSandClock } from "react-icons/cg";
import { AiOutlineStop } from "react-icons/ai";

const statusHandler = (value) => {
  switch (value) {
    case "PENDING":
      return <div className="flex items-center justify-center  text-yellow-700"><CgSandClock /> در انتظار </div>;
    case "CLOSED":
      return <div className="flex items-center justify-center  text-rose-700"><RiCloseLine /> بسته شده </div>;
    case "ACTIVE":
      return <div className="flex items-center justify-center  text-green-600"><MdDone /> فعال </div>;
    case "REJECT":
      return <div className="flex items-center justify-center  text-orange-600"><AiOutlineStop /> رد شده </div>;
  }
};

//tostify
const notifyError = (err) =>
  toast.error(err, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
const notifySuccess = () =>
  toast.success("درخواست با موفقیت انجام شد", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
const token = getCookie("accessToken");

const Orders: NextPage = () => {
  const [ordersData, setOrdersData] = useState(null);
  const [pagenumber, setPageNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moadalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchOrders = () => {
    axiosInstance
      .get(`admin/orders/${pagenumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrdersData(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, [pagenumber, isModalOpen]);

  const COLUMNS = [
    {
      Header: "شناسه",
      accessor: "id",
      minWidth: 50,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "کتاب",
      accessor: "book.bookName",
      minWidth: 300,
    },
    {
      Header: "کد کتاب",
      accessor: "book.id",
      minWidth: 150,
      Cell: (cell) => <div dir="ltr">{PN.convertEnToPe(cell.value)}</div>,
    },

    {
      Header: "ثبت کننده",
      accessor: "reference",
      minWidth: 200,
      Cell: (cell) => {
        {
          return cell.value === "USER" ? <div>کاربر</div> : <div>ادمین</div>;
        }
      },
    },
    {
      Header: "وضعیت",
      accessor: "orderStatus",
      minWidth: 200,
      Cell: (cell) => {
        return statusHandler(cell.value);
      },
    },
    {
      Header: "نام",
      accessor: "user.firstname",
      minWidth: 150,
    },
    {
      Header: "نام خانوادگی",
      accessor: "user.lastname",
      minWidth: 200,
    },
    {
      Header: "کد ملی",
      accessor: "user.username",
      minWidth: 200,
      Cell: (cell) => <div>{PN.convertEnToPe(cell.value)}</div>,
    },
    {
      Header: "شماره تماس",
      accessor: "phoneNumber",
      minWidth: 150,
      Cell: (cell) => {
        return cell.value ? (
          <div>{PN.convertEnToPe(cell.value)}</div>
        ) : (
          <div>ندارد</div>
        );
      },
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
      Header: "تاریخ تحویل",
      accessor: "expireAt",
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
        <div className="flex items-center gap-3">
          {/* <button value={cell.accessor} className="felx items-center min-w-max" onClick={handleEdit}>
          <span className="flex items-center bg-blue-500 px-[4px] rounded text-white  hover:text-blue-900 hover:bg-white">

              <RiEditFill /> &nbsp; ویرایش
            </span>
          </button> */}
          <button value={cell.accessor} className="felx items-center min-w-max  cursor-pointer"  onClick={() => handleDelete(cell.row.original.trakingCode)}>
          <span className="flex items-center bg-red-500 px-[4px] rounded text-white  hover:text-red-900 hover:bg-white ">

              <MdDelete /> &nbsp; بستن سفارش
            </span>
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (e) => {
    console.log("edit button");
  };
  const handleDelete = (rowDetail) => {
    axiosInstance.post('admin/closeorder', { trakingCode:rowDetail }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(() => notifySuccess())
    .catch(() => notifyError("خطا در بستن سفارش"))
  };

  if (!ordersData) {
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
        <OrdersModal
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
      <BasicTable rowsdata={ordersData} columnsData={COLUMNS} />
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

(Orders as any).layout = Admin;
export default Orders;
