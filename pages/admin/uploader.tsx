import { NextPage } from "next";
import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import axiosInstance from "../../utils/axiosInstance";

const UserUploader: NextPage = () => {
  const [file, setFile] = useState(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("userfile", file);

    return await axiosInstance.post("UPLOAD_ENDPOINT", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let res = await uploadFile(file);
    console.log(res.data);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex w-full flex-col h-[90vh] items-center justify-center bg-grey-lighter">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-100 hover:text-blue-700">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">انتخاب فایل</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => console.log(e.currentTarget.files[0])}
            />
          </label>
          <button type="submit">submit</button>
        </div>
      </form>
    </>
  );
};

(UserUploader as any).layout = Admin;

export default UserUploader;
