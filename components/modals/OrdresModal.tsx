import React, { useEffect, useState } from "react";
import Select from "react-select";
import PN from "persian-number";
import axiosInstance from "../../utils/axiosInstance";

const eventHandler = (e) => {
  e.stopPropagation();
};

const durationOption = [
  { value: 10, label: PN.convertEnToPe("10") },
  { value: 15, label: PN.convertEnToPe("15") },
  { value: 20, label: PN.convertEnToPe("20") },
  { value: 25, label: PN.convertEnToPe("25") },
  { value: 30, label: PN.convertEnToPe("30") },
];

const OrdresModal = ({ setIsModalOpen, isModalOpen }) => {
  const [nationId, setNationId] = useState("1");
  const [nationOption, setNationOption] = useState([]);
  const [bookId, setBookId] = useState("1");
  const [bookOption, setBookOption] = useState([]);

  const fetchNationCode = async () => {
    axiosInstance.get(`admin/user/search/${nationId}`).then((res) => {
      let users = res.data;
      nationCodeOptionFilter(users);
    });
  };
  const fetchBook = async () => {
    await axiosInstance.get(`admin/book/search/${bookId}`).then((res) => {
      let books = res.data;
      bookOptionFilter(books);
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

  const bookOptionFilter = (data) => {
    const dataArray = data.map((item) => {
      return {
        value: item.id,
        label: item.bookName,
      };
    });
    setBookOption(dataArray);
  };

  useEffect(() => {
    fetchNationCode();
    fetchBook();
  }, [nationId, bookId]);

  return (
    <>
      {isModalOpen && (
        <div
          className={`w-full h-full  flex justify-center items-center fixed t-0 r-0  bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={eventHandler}
            className="w-96 h-[60vh] rounded bg-white flex flex-col p-10  justify-around items-center"
          >
            <h4>ایجاد سفارش</h4>
            <div className="h-[1px] bg-slate-200 w-full" />
            <label htmlFor="nationCode">
              کد ملی
              <Select
                id="nationCode"
                className=" w-64"
                onInputChange={(e) => setNationId(e)}
                options={nationOption}
                placeholder="کد ملی متقاضی"
              />
            </label>
            <label htmlFor="bookCode">
              کد کتاب
              <Select
                id="bookCode"
                className=" w-64"
                onInputChange={(e) => setBookId(e)}
                options={bookOption}
                placeholder="کد کتاب"
              />
            </label>
            <label htmlFor="duration">
              مدت سفارش
              <Select
                id="duration"
                isSearchable={false}
                className=" w-64"
                defaultValue={durationOption[0]}
                options={durationOption}
                placeholder="مدت سفارش"
              />
            </label>
            <button
              type="submit"
              className="w-20 bg-slate-700 text-white h-10 rounded hover:bg-slate-600"
            >
              ثبت
            </button>
          </div>
        </div>
      ) }
    </>
  );
};

export default OrdresModal;
