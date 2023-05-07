import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { getCookie } from "cookies-next";
export default function EditUserPage(){

    const router=useRouter()
    const token = getCookie("accessToken");
    const [data,setData]=useState({
        id:null,
        firstname:dataUser?.firstname,
        lastname:dataUser?.lastname,
        avatarSource:dataUser?.avatarSource,
        usernameSocial:dataUser?.usernameSocial,
        userStatus:dataUser?.userStatus,
        level:dataUser?.level,
        libraryId:dataUser?.libraryId,
        phoneNumber:dataUser?.phoneNumber,
        studentId:dataUser?.studentId,
        username:dataUser?.username,

    })
    const userId=router.query.id
    const [dataUser,setDataUser]:any=useState(null)
    useEffect(()=>{
        axiosInstance.get(`admin/userinfo/${userId}`,{headers:{
            Authorization: `Bearer ${token}`,

        }})
        .then(function(response){
            setDataUser(response.data)
        })

    },[])
    console.log(dataUser)
    return <>
    {/* Card Section */}
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Card */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            حساب کاربری
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            حساب کاربری خود را ویرایش کنید
          </p>
        </div>
        <form>
          {/* Grid */}
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                تصویر شما
              </label>
            </div>
            {/* End Col */}
            <div className="col-span-9">
              <div className="flex items-center gap-5">
                <img
                  className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={dataUser?.avatarSource}
                  alt="Image Description"
                />
                <div className="flex gap-x-2">
                  
                </div>
              </div>
            </div>
            {/* End Col */}
            <div className="col-span-3">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
             نام کامل
              </label>
              <div className="hs-tooltip inline-block">
                <button type="button" className="hs-tooltip-toggle ml-1">
                  <svg
                    className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </button>
              
              </div>
            </div>
            {/* End Col */}
            <div className="col-span-9">
              <div className="sm:flex">
                <input
                  id="af-account-full-name"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder={dataUser?.firstname}
                  value={(e)=>setData({firstname:e.taraget.value})}
                />
                <input
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder={dataUser?.lastname}
                />
              </div>
            </div>
            {/* End Col */}
            <div className="col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                شماره دانشجویی
              </label>
            </div>
            {/* End Col */}
            <div className="col-span-9">
              <input
                id="af-account-email"
                type="text"
                className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder={dataUser?.studentId}
              />
            </div>
            {/* End Col */}
            <div className="col-span-3">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                کدملی
              </label>
            </div>
            {/* End Col */}
            <div className="col-span-9">
              <div className="space-y-2">
                <input
                  id="af-account-password"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder={dataUser?.username}
                />
                
              </div>
            </div>
            {/* End Col */}
            <div className="col-span-3">
              <div className="inline-block">
                <label
                  htmlFor="af-account-phone"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  شماره تماس
                </label>
              
              </div>
            </div>
            {/* End Col */}
            <div className="col-span-9">
              <div className="sm:flex">
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder={dataUser?.phoneNumber}
                />
                <select className="py-2 px-3 pr-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                  <option selected>98+</option>
                </select>
              </div>
              
            </div>
            {/* End Col */}
            <div className="col-span-3">
              <label
                htmlFor="af-account-gender-checkbox"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                وضعیت
              </label>
            </div>
            {/* End Col */}
            <div className="col-span-9">
              <div className="sm:flex">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    name="af-account-gender-checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="af-account-gender-checkbox"
                    defaultChecked=""
                  />
                  <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                    فعال
                  </span>
                </label>
                <label
                  htmlFor="af-account-gender-checkbox-female"
                  className="flex py-2 px-3 block w-full border border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    name="af-account-gender-checkbox-female"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="af-account-gender-checkbox-female"
                  />
                  <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                    غیرفعال
                  </span>
                </label>
              
              </div>
            </div>
            {/* End Col */}
  
          
          </div>
          {/* End Grid */}
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              بیخیال بابا
            </button>
            <button
              type="button"
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
      {/* End Card */}
    </div>
    {/* End Card Section */}
  </>
  
}