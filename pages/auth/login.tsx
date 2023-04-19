import React, { useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FiServer} from 'react-icons/fi'
import Auth from "../../layouts/Auth";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/router";

//tostify
const notifyError = (err) =>
  toast.error(err, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });

const Login: React.FC = () => {
  const [formData, setFormData] = useState(null);

  const router = useRouter();

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const cookieHandler = (res) => {
    if (res.data.accessToken && res.data.ruleBase) {
      setCookie("accessToken", `${res.data.accessToken}`);
      setCookie("ruleBase", `${res.data.ruleBase}`);
    } else {
      notifyError("رمز عبور یا نام کاربری اشباه است");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post("auth/login", formData, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => cookieHandler(response))
      .then(
        () =>
          getCookie("accessToken") &&
          getCookie("ruleBase") === "ADMIN" &&
          router.push("/admin/dashboard")
      )
      .catch((err) => notifyError(err.response.data.message[0]));
  };

  return (
    <Auth>
      <div className="container mx-auto px-4 h-screen">
       
      <main className="w-full max-w-md mx-auto p-6">
  <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div className="p-4 sm:p-7">
      <div className="text-center">
       <img className="w-40 mx-auto" src="https://boookito.ir/BOOOKITO%20(3).png" alt="" />
       
      </div>
      <a href="https://boookito.betteruptime.com"
  type="button"
  className="w-full py-3 px-4 text-gray-700 font-bold  inline-flex justify-center items-center gap-2 rounded-md border  bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
>

<FiServer/>
  وضعیت سرورها
</a>

      <div className="mt-5">
      
     
        <form onSubmit={submitForm}>
          <div className="grid gap-y-4">

            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 text-gray-700 font-bold  dark:text-white"
              >
                نام کاربری
              </label>
              <div className="relative">
                <input
                autoComplete="off"
                  type="text"
                  maxLength={10}
                  id="username"
                  name="username"
                  onChange={changeHandler}
                  className="py-3 px-4 text-gray-900 font-bold text-center  block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  required
                  aria-describedby="email-error"
                />
            
              </div>
              
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 text-gray-700 font-bold dark:text-white"
                >
                  رمز عبور
                </label>
            
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  onChange={changeHandler}
                  name="password"
                  className="py-3 px-4 text-gray-900 font-bold text-center  block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  required
                  aria-describedby="password-error"
                />
                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
             
                </div>
              </div>
             
            </div>
          
            <button
              type="submit"
              className="py-3 px-4 mt-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              ورود
            </button>
          </div>
        </form>
        {/* End Form */}
      </div>
    </div>
  </div>
</main>



        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
        />
      </div>
    </Auth>
  );
};

export default Login;
