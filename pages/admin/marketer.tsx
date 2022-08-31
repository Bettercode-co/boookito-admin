import { NextPage } from 'next'
import React from 'react'
import Admin from '../../layouts/Admin'


const marketer: NextPage = () => {
  return (
    <div className='p-16'>
        <div className='pb-14'>
          <h3 className='font-bold'>ثبت مدارک احراز هویت</h3>
          <div className='h-[1px] bg-slate-300 my-4' />
          <div className='grid  grid-cols-3 gap-x-16 gap-y-8'>
              <div className='flex flex-col'>
                <p className='pb-2'>نوع کاربر</p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-0' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>نام شرکت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>نوع شرکت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره تماس</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
          </div>
        </div>
        <div>
          <h3 className='font-bold'>اطلاعات عمومی</h3>
          <div className='h-[1px] bg-slate-300 my-4' />
          <div className='grid  grid-cols-3 gap-x-16 gap-y-8'>
              <div className='flex flex-col'>
                <p className='pb-2'>جنسیت </p>
                <input className='border-slate-200 outline-none focus:border-none focus:outline-0' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>نام </p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'> نام خانوادگی</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
              <div className='flex flex-col'>
                <p className='pb-2'>شماره ثبت</p>
                <input className='border-slate-200 outline-none focus:border-none focus:-none' type="text" />
              </div>
          </div>
        </div>

    </div>
  )
}

(marketer as any).layout = Admin
export default marketer