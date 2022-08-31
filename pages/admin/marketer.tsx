import { NextPage } from 'next'
import React from 'react'
import Admin from '../../layouts/Admin'
import {Form, Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

interface FormValues {
  user: string
  companyName: string
  companyType: string
}

type errors = {
  user?: string
  companyName?: string
  companyType?: string
}

const initialValues = {
  user: '',
  companyName: '',
  companyType: ''
}

const onSubmit = values => {
  console.log(values);
}


const validationSchema = Yup.object({
  user: Yup.string().required( "این قسمت را تکمیل کنید"),
  companyName: Yup.string().required( "این قسمت را تکمیل کنید"),
  companyType: Yup.string().required( "این قسمت را تکمیل کنید")
})

const Marketer: NextPage = () => {


  return (
    <div className='p-16 flex flex-col'>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
      <Form>
        <div className='pb-14'>
          <h3 className='font-bold'>ثبت مدارک احراز هویت</h3>
          <div className='h-[1px] bg-slate-300 my-4' />
          <div className='grid  grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8'>
              <div className='flex flex-col relative mb-5'>
                <label htmlFor='user' className='pb-2'>نوع کاربر</label >
                <Field name='user' id='user'  className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
                <ErrorMessage name='user' />
                {/* {formik.touched.user && formik.errors.user ? <span className='absolute bottom-[-20px] text-red-700'>{formik.errors.user}</span> : null} */}
              </div>
              <div className='flex flex-col relative mb-5'>
                <label htmlFor='companyName' className='pb-2'>نام شرکت</label>
                <Field name='companyName' id='companyName' className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
                <ErrorMessage name='companyName' />
                {/* {formik.touched.companyName && formik.errors.companyName ? <span className='absolute bottom-[-20px] text-red-700'>{formik.errors.companyName}</span> : null} */}
              </div>
              <div className='flex flex-col h-20 relative mb-5'>
                <label htmlFor='companyType' className='pb-2'>نوع شرکت</label>
                <Field name='companyType' id='companyType' className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
                <ErrorMessage name='companyType' />
                {/* {formik.touched.companyType && formik.errors.companyType ? <span className='absolute bottom-[-20px] text-red-700'>{formik.errors.companyType}</span> : null} */}
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره تماس</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
          </div>
        </div>
        <div>
          <h3 className='font-bold'>اطلاعات عمومی</h3>
          <div className='h-[1px] bg-slate-300 my-4' />
          <div className='grid  grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8'>
              <div className='flex flex-col'>
                <p className='pb-2'>جنسیت </p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>نام </p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'> نام خانوادگی</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-teal-500 focus:ring-transparent' type="text" />
              </div>
          </div>
        </div>
      <div className='flex my-20  w-full justify-end items-center h-3'>
        <button  className="    w-32 h-10 rounded bg-cyan-700 text-white hover:bg-cyan-600 transition" type='submit'>ثبت</button>

      </div>
        </Form>
        </Formik>
    </div>
  )
}

(Marketer as any).layout = Admin
export default Marketer