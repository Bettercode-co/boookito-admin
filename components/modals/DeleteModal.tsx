import React from "react";
import axiosInstance from "../../utils/axiosInstance";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiTimes } from "react-icons/ti";

const eventHandler = (e) => {
  e.stopPropagation();
};

// access token
const token = getCookie("accessToken");

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

const DeleteModal = ({
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  rowData,
  fetchUrl,
}) => {
  const deleteHandler = () => {
    axiosInstance
      .delete(fetchUrl + rowData.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => notifySuccess())
      .then(() => setIsDeleteModalOpen(false))
      .catch((err) => notifyError(err.response.data.error.message));
  };

  return (
    <>
      {isDeleteModalOpen && (
        <div
          className={`w-full h-full  flex justify-center items-center fixed t-0 r-0  bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            onClick={eventHandler}
            className="relative w-[400px] h-[25vh] rounded bg-white flex flex-col p-10  justify-around items-center"
          >
            <div
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <TiTimes size={20} />
            </div>
            <div className="w-full text-center">
              <h3 className="mb-1 text-lg font-semibold">
                {rowData.bookName}
                {rowData.categoryName}
                {rowData.title}
              </h3>
              <div className="h-[1px] bg-slate-200 w-full mb-5" />
              <h4 className=" ">مطمئن هستید می خواهید حذف کنید ؟</h4>
            </div>
            <div className="w-full flex gap-5">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="transition-all w-full bg-slate-300 text-white h-10 rounded hover:bg-slate-500"
              >
                بستن
              </button>
              <button
                onClick={deleteHandler}
                className="transition-all w-full bg-red-600 text-white h-10 rounded hover:bg-red-800"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
      />
    </>
  );
};

export default DeleteModal;
