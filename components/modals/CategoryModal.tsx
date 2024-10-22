import React, { useState } from "react";
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

const CategoryModal = ({ setIsModalOpen, isModalOpen }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const newCategoryHandler = (event) => {
    event.preventDefault();
    axiosInstance
      .post(
        "admin/categories",
        { categoryName: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => notifySuccess())
      .then(() => {
        setIsModalOpen(false);
        setInputValue("");
      })
      .catch((err) => notifyError(err.response.data.message[0]));
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={`w-full h-full  flex justify-center items-center fixed t-0 r-0  bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={() => {
            setIsModalOpen(false);
            setInputValue("");
          }}
        >
          <form
            onSubmit={(event) => newCategoryHandler(event)}
            onClick={eventHandler}
            className="relative w-96 h-[40vh] rounded bg-white flex flex-col p-10  justify-around items-center"
          >
            <div
              onClick={() => {
                setIsModalOpen(false);
                setInputValue("");
              }}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <TiTimes size={20} />
            </div>
            <div className="w-full text-center">
              <h4>دسته بندی جدید</h4>
              <div className="h-[1px] bg-slate-200 w-full mt-5" />
            </div>
            <label className="w-full relative">
              نام دسته بندی
              <input
                className="w-full border border-[#ccc] rounded h-[38px] mt-2 px-3"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </label>
            <button
              type="submit"
              className="w-full bg-green-800 text-white h-10 rounded hover:bg-green-700"
            >
              ثبت
            </button>
          </form>
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

export default CategoryModal;
