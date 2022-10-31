import React, { useEffect, useState } from "react";
import Select from "react-select";
import PN from "persian-number";
import axiosInstance from "../../utils/axiosInstance";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiTimes } from "react-icons/ti";

type NewOrder = {
  user?: string;
  book?: number;
  day: number;
};

const eventHandler = (e) => {
  e.stopPropagation();
};

// access token
const token = getCookie("accessToken");

// select day options
const durationOption = [
  { value: 10, label: PN.convertEnToPe("10 روز") },
  { value: 15, label: PN.convertEnToPe("15 روز") },
  { value: 20, label: PN.convertEnToPe("20 روز") },
  { value: 25, label: PN.convertEnToPe("25 روز") },
  { value: 30, label: PN.convertEnToPe("30 روز") },
];

//tostify
const notifyError = (err) =>
  toast.error(err, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
const notifySuccess = () =>
  toast.success("درخواست با موفقیت انجام شد", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });

const OrdresModal = ({ setIsModalOpen, isModalOpen }) => {
  const [nationId, setNationId] = useState("1");
  const [nationOption, setNationOption] = useState([]);
  const [newOrder, setNewOrder] = useState<NewOrder>({
    day: 15,
  });

  const neworderHandler = () => {
      console.log(newOrder)
      axiosInstance
        .post("admin/neworder", newOrder, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => notifySuccess())
        .catch((err) => {
          if(err.response.data.message.length > 1){
            err.response.data.message.map(errMsg => {
              notifyError(errMsg)
            })
          }else{
            notifyError(err.response.data.message[0])
          }
        })
      notifyError("خطا در ارسال سفارش");
  };

  const fetchNationCode = async () => {
    axiosInstance.get(`admin/user/search/${nationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      let users = res.data;
      nationCodeOptionFilter(users);
    });
  };


  const nationCodeOptionFilter = (data) => {
    const dataArray = data.map((item) => {
      return {
        value: item.username,
        label: `${PN.convertEnToPe(item.username)} - ${item.firstname} ${
          item.lastname
        }`,
      };
    });
    setNationOption(dataArray);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNationCode();
      console.log("settimeout");
    }, 2000);

    return () => clearTimeout(timer);
  }, [nationId, newOrder]);

  return (
    <>
      {isModalOpen && (
        <div
          className={`w-full h-full  flex justify-center items-center fixed t-0 r-0  bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={eventHandler}
            className="relative w-96 h-[60vh] rounded bg-white flex flex-col p-10  justify-around items-center"
          >
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <TiTimes size={20} />
            </div>
            <h4>ایجاد سفارش</h4>
            <div className="h-[1px] bg-slate-200 w-full" />
            <label htmlFor="nationCode">
              کد ملی
              <Select
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    user: e.value,
                  })
                }
                id="nationCode"
                className=" w-64"
                onInputChange={(e) => setNationId(e)}
                options={nationOption}
                placeholder="کد ملی متقاضی"
              />
            </label>
            {/* <label htmlFor="bookCode">
              کد کتاب
              <Select
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    book: e.value,
                  })
                }
                id="bookCode"
                className=" w-64"
                onInputChange={(e) => setBookId(e)}
                options={bookOption}
                placeholder="کد کتاب"
              />
            </label> */}
            <label htmlFor="duration">
              مدت سفارش
              <Select
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    day: e.value,
                  })
                }
                id="duration"
                isSearchable={false}
                className=" w-64"
                defaultValue={durationOption[1]}
                options={durationOption}
                placeholder="مدت سفارش"
              />
            </label>
            <label className="w-64 flex flex-col items-center relative">
              <span className="w-full text-right" >
             کد کتاب  
              </span>
              <input
                className="w-64 border border-[#ccc] rounded h-[38px] mt-2"
                type='number'
                onChange={e => {
                  setNewOrder({
                    ...newOrder,
                    book: +e.target.value
                  })
                }}
              />
                
            </label>
            <button
              onClick={neworderHandler}
              className="w-64 bg-slate-700 text-white h-10 rounded hover:bg-slate-600"
            >
              ثبت
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
      />
    </>
  );
};

export default OrdresModal;
