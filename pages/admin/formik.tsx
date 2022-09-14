import { NextPage } from "next";
import React from "react";
import Admin from "../../layouts/Admin";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// tailwind styles
const sectionContainer =
  "grid  grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8";
const inputContainer = "flex flex-col h-20 relative mb-5";
const fieldClass =
  "border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent";

const initialValues = {
  user: "",
  companyName: "",
  companyType: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  user: Yup.string().required("این قسمت را تکمیل کنید"),
  companyName: Yup.string().required("این قسمت را تکمیل کنید"),
  companyType: Yup.string().required("این قسمت را تکمیل کنید"),
  company: Yup.string().required("تکمیل کنید"),
});

const orders: NextPage = () => {
  return (
    <div className="p-16 flex flex-col">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="pb-14 ">
            <h3 className="font-bold">ثبت مدارک احراز هویت</h3>
            <div className="h-[1px] bg-slate-300 my-4" />
            <div className={sectionContainer}>
              <div className={inputContainer}>
                <label htmlFor="user" className="pb-2">
                  نوع کاربر
                </label>
                <Field
                  autocomplete="off"
                  name="user"
                  id="user"
                  className={fieldClass}
                  type="text"
                />
                <ErrorMessage name="user">
                  {(errMsg) => {
                    return (
                      <div className="absolute bottom-[-20px] text-red-700">
                        {errMsg}
                      </div>
                    );
                  }}
                </ErrorMessage>
              </div>
              <div className={inputContainer}>
                <label htmlFor="companyName" className="pb-2">
                  نام شرکت
                </label>
                <Field
                  autocomplete="off"
                  name="companyName"
                  id="companyName"
                  className={fieldClass}
                  type="text"
                />
                <ErrorMessage name="companyName">
                  {(errMsg) => {
                    return (
                      <div className="absolute bottom-[-20px] text-red-700">
                        {errMsg}
                      </div>
                    );
                  }}
                </ErrorMessage>
              </div>
              <div className={inputContainer}>
                <label htmlFor="companyType" className="pb-2">
                  نوع شرکت
                </label>
                <Field
                  autocomplete="off"
                  name="companyType"
                  id="companyType"
                  className={fieldClass}
                  type="text"
                />
                <ErrorMessage name="companyType">
                  {(errMsg) => {
                    return (
                      <div className="absolute bottom-[-20px] text-red-700">
                        {errMsg}
                      </div>
                    );
                  }}
                </ErrorMessage>
              </div>
              <div className={inputContainer}>
                <label htmlFor="company" className="pb-2">
                  {" "}
                  شرکت
                </label>
                <Field
                  autocomplete="off"
                  name="company"
                  id="company"
                  className={fieldClass}
                  type="text"
                />

                <ErrorMessage name="company">
                  {(errMsg) => {
                    return (
                      <div className="absolute bottom-[-20px] text-red-700">
                        {errMsg}
                      </div>
                    );
                  }}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <p className="pb-2">شماره ثبت</p>
                <input className={fieldClass} type="text" />
              </div>
              <div className="flex flex-col">
                <p className="pb-2">شماره تماس</p>
                <input className={fieldClass} type="text" />
              </div>
              <div className="flex flex-col">
                <p className="pb-2">شماره ثبت</p>
                <input className={fieldClass} type="text" />
              </div>
              <div className="flex flex-col">
                <p className="pb-2">شماره ثبت</p>
                <input className={fieldClass} type="text" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold">اطلاعات عمومی</h3>
            <div className="h-[1px] bg-slate-300 my-4" />
            <div className={sectionContainer}>
              <div className="flex flex-col">
                <p className="pb-2">جنسیت </p>
                <input className={fieldClass} type="text" />
              </div>
              <div className="flex flex-col">
                <p className="pb-2">نام </p>
                <input className={fieldClass} type="text" />
              </div>
              <div className="flex flex-col">
                <p className="pb-2"> نام خانوادگی</p>
                <input className={fieldClass} type="text" />
              </div>
              <div className="flex flex-col">
                <p className="pb-2">شماره ثبت</p>
                <input className={fieldClass} type="text" />
              </div>
            </div>
          </div>
          <div className="flex my-20  w-full justify-end items-center h-3">
            <button
              className="    w-32 h-10 rounded bg-cyan-700 text-white hover:bg-cyan-600 transition"
              type="submit"
            >
              ثبت
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

(orders as any).layout = Admin;
export default orders;
