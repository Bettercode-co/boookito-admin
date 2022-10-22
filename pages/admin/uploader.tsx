import { NextPage } from "next";
import React, { FormEvent, FormEventHandler, useState } from "react";
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

  const submitHandler : FormEventHandler = async (e) => {
    e.preventDefault();
    let res = await uploadFile(file);
    console.log(res.data);
  };

  return (
    <div className="flex w-full justify-center items-center flex-col h-[85vh]">
    <h2 className="mb-16 text-2xl font-bold text-slate-700 drop-shadow">
      فایل مورد نظر خود را اینجا آپلود کنید
    <div className="h-[1px] bg-slate-300 mt-6 w-full" />
    </h2>
      <form onSubmit={submitHandler}>
        <div className="flex w-full flex-col  items-center justify-center bg-grey-lighter">
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
              onChange={(e) => setFile(e.currentTarget.files[0])}
            />
          </label>
          {file && <div className="mt-5"> <span > نام فایل : </span> <span className="font-semibold" >{file?.name}</span> </div> }
          <button className="bg-sky-700 text-white font-semibold w-64 mt-16 rounded py-2 hover:bg-sky-600 transition-all" type="submit">ارسال</button>
        </div>
      </form>
    </div>
  );
};

(UserUploader as any).layout = Admin;

export default UserUploader;
