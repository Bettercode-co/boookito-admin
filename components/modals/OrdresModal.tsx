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

const OrdresModal = ({ setIsModalOpen, isModalOpen }) => {
  return (
    <>
      {isModalOpen ? (
    <div className="w-full h-full  flex justify-center items-center fixed t-0 r-0 px-96 bg-gray-300 bg-opacity-50" onClick={() => setIsModalOpen(false)}>

          <div
          onClick={eventHandler}
           className="w-96 h-96 rounded bg-white flex flex-col p-10  justify-around items-center"
           >
             <Select className=" w-52" options={options} />
             <Select className=" w-52" options={options} />
             <input type="text" placeholder="مدت سفارش" className="rounded" />
             <button className="w-20 bg-slate-700 text-white h-10 rounded hover:bg-slate-600">ثبت</button>
            </div>
        </div>
      ) : null}
      </>
  );
};

export default OrdresModal;
