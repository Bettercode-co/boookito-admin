
import React, { useState } from "react";
import { setCookie, getCookie } from 'cookies-next';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [formData, setFormData] = useState(null)

  const router = useRouter()

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value.trim()
    })    
  }

  const cookieHandler = (res) => {
    if(res.data.accessToken  && res.data.ruleBase){
      setCookie("accessToken", `${res.data.accessToken}`)
      setCookie("ruleBase", `${res.data.ruleBase}`)
    }else{
      notifyError('رمز عبور یا نام کاربری اشباه است')
    }
  }


  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance.post('auth/login', formData, {headers: { 'content-type': 'application/json' }})
    .then(response => cookieHandler(response))
    .then((() => getCookie('accessToken') && getCookie('ruleBase') === 'ADMIN' && router.push('/admin/dashboard')))
    .catch((err) => notifyError(err.response.data.message[0]))
  }

  return (
    <Auth>
      <div className="container mx-auto px-4 h-screen">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-slate-500 text-sm font-bold">
                    ورود به حساب کاربری
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-slate-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-slate-400 text-center mb-3 font-bold">
                </div>
                <form onSubmit={submitForm}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2 text-center"
                      htmlFor="grid-password"
                    >
                      نام کاربری
                    </label>
                    <input
                      type="text"
                      className="placeholder:text-center text-center border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="نام کاربری"
                      name="username"
                      onChange={changeHandler}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2 text-center"
                      htmlFor="grid-password"
                    >
                      رمز عبور
                    </label>
                    <input
                      type="password"
                      className="placeholder:text-center text-center border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="رمز عبور"
                      name="password"
                      onChange={changeHandler}
                      required
                    />
                  </div>


                  <div className="text-center mt-6">
                    <button
                      className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      ورود
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
    </Auth>
  );
};

export default Login;

