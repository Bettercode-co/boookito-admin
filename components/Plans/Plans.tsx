import React from 'react'

const Plans = () => {
  return (
    <div className='w-full h-[50rem] flex justify-around mt-20 '>
    <div className='w-1/4 bg-slate-700 h-4/6  rounded-lg overflow-hidden' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} >

        <div className='h-1/3 bg-slate-600 flex flex-col text-slate-50 items-center justify-around'>
            <h3 className='text-2xl font-bold'>پلن فلان</h3>
            <h4 className='self-start mr-10 text-white'>قیمت : یه تومن</h4>
            <div className='flex w-full px-7 justify-between items-center'>
                <input type="text" className='bg-slate-300 h-7 rounded text-black'  />
                <button className='bg-slate-400 text-slate-900 w-1/4 rounded h-full'>ثبت</button>
            </div>
        </div>
        <div className='h-[1px] bg-slate-50 ' />
        <div className='text-slate-200 p-10 leading-10'>
            <p>- متن فلان</p>
            <p>- تکست فلان</p>
            <p>- متن ملان</p>
            <p>- تکست بیسار</p>
            <p>- تکست بمان</p>
        </div>
    </div>
    
    <div className='w-1/4 bg-slate-700 h-4/6  rounded-lg overflow-hidden' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>

        <div className='h-1/3 bg-slate-600 flex flex-col text-slate-50 items-center justify-around'>
            <h3 className='text-2xl font-bold'>پلن فلان</h3>
            <h4 className='self-start mr-10'>قیمت : دو تومن</h4>
            <div className='flex w-full px-7 justify-between items-center'>
                <input type="text" className='bg-slate-300 h-7 rounded text-black'  />
                <button className='bg-slate-400 text-slate-900 w-1/4 rounded h-full'>ثبت</button>
            </div>
        </div>
        <div className='h-[1px] bg-slate-50 ' />
        <div className='text-slate-200 p-10 leading-10'>
            <p>- متن فلان</p>
            <p>- تکست فلان</p>
            <p>- متن ملان</p>
            <p>- تکست بیسار</p>
            <p>- تکست بمان</p>
        </div>
        
    </div>
    <div className='w-1/4 bg-slate-700 h-4/6  rounded-lg overflow-hidden' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>

        <div className='h-1/3 bg-slate-600 flex flex-col text-slate-50 items-center justify-around'>
            <h3 className='text-2xl font-bold'>پلن فلان</h3>
            <h4 className='self-start mr-10'>قیمت : سه تومن</h4>
            <div className='flex w-full px-7 justify-between items-center'>
                <input type="text" className='bg-slate-300 h-7 rounded text-black'  />
                <button className='bg-slate-400 text-slate-900 w-1/4 rounded h-full'>ثبت</button>
            </div>
        </div>
        <div className='h-[1px] bg-slate-50 ' />
        <div className='text-slate-200 p-10 leading-10'>
            <p>- متن فلان</p>
            <p>- تکست فلان</p>
            <p>- متن ملان</p>
            <p>- تکست بیسار</p>
            <p>- تکست بمان</p> 
        </div>
        
    </div>
</div>
  )
}

export default Plans