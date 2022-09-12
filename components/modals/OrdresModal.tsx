import React from "react";
import Select from 'react-select'

const eventHandler = (e) => {
  e.stopPropagation()
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const options2 = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' }
]

const OrdresModal = ({ setIsModalOpen, isModalOpen }) => {
  return (
    <>
      {isModalOpen ? (
    <div className="w-full h-full  flex justify-center items-center fixed t-0 r-0  bg-gray-300 bg-opacity-50" onClick={() => setIsModalOpen(false)}>

          <div
          onClick={eventHandler}
           className="w-96 h-[60vh] rounded bg-white flex flex-col p-10  justify-around items-center"
           >
            <h4>ایجاد سفارش</h4>
            <div className="h-[1px] bg-slate-200 w-full" />
             <Select className=" w-64" options={options} placeholder="کد ملی متقاضی" />
             <Select className=" w-64" options={options} placeholder="کد کتاب" />
             <Select isSearchable={false} className=" w-64" defaultValue={options2[0]} options={options2}  placeholder="مدت سفارش" />
             <button type="submit" className="w-20 bg-slate-700 text-white h-10 rounded hover:bg-slate-600">ثبت</button>
            </div>
        </div>
      ) : null}
      </>
  );
};

export default OrdresModal;
