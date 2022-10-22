import React, { useEffect, useState } from "react";
import Select from "react-select";

//react icons
import { RiAddCircleLine } from "react-icons/ri";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { TiTimes } from "react-icons/ti";
import axiosInstance from "../../utils/axiosInstance";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";

type AthorListType = {
  athor: string;
};
type TranslatorlistType = {
  translator: string;
};

const eventHandler = (e) => {
  e.stopPropagation();
};

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

// access token
const token = getCookie("accessToken");

const BooksModal = ({ setIsModalOpen, isModalOpen }) => {
  //   -----------------------MULTI INPUT STATE----------------------------------
  const [athorList, setAthorList] = useState<AthorListType[]>([{ athor: "" }]);
  const [translatorlist, setTranslatorList] = useState<TranslatorlistType[]>([
    { translator: "" },
  ]);

  const [categories, setCategories] = useState([])
  const [newBook, setNewBook] = useState({});

  useEffect(() => {
    fetchCategory()
    console.log(categories)
},[])

  const fetchNewBook = () => {
    if(true){
        axiosInstance
          .post("admin/neworder", newBook, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => notifySuccess())
          .catch((err) => notifyError(err));
      }else{
        notifyError("خطا در ارسال سفارش");
    }
    
    }

  const categoryOptionFilter = (data) => {
    const dataArray = data.map((item) => {
      return {
        value: item.id,
        label: item.categoryName,
      };
    });
    setCategories(dataArray);
  };

  const fetchCategory = async() => {
    await axiosInstance.get('admin/categories')
    .then(res => {
        let cat = res.data
        categoryOptionFilter(cat)
    } )

}

  //   -----------------------MULTI INPUT HANDLER----------------------------------
  const addAthorHandler = () => {
    setAthorList([...athorList, { athor: "" }]);
  };
  const addTranslatorHandler = () => {
    setTranslatorList([...translatorlist, { translator: "" }]);
  };

  const removeAthorHandler = (index) => {
    const values = [...athorList];
    values.splice(index, 1);
    setAthorList(values);
  };
  const removeTranslatorHandler = (index) => {
    const values = [...translatorlist];
    values.splice(index, 1);
    setTranslatorList(values);
  };

  const athorChangeHandler = (index, e) => {
    const values = [...athorList];
    values[index][e.target.name] = e.target.value;
    setAthorList(values);
    console.log(athorList);
  };
  const translatorChangeHandler = (index, e) => {
    const values = [...translatorlist];
    values[index][e.target.name] = e.target.value;
    setTranslatorList(values);
    console.log(translatorlist);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={`overflow-y-scroll md:overflow-hidden  w-full h-full  flex justify-center items-center fixed   bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={() => setIsModalOpen(false)}
        >
          {/* <form> */}
          <div
            onClick={eventHandler}
            className="relative mt-96 md:mt-0 w-full mx-10  rounded bg-white flex flex-col p-10  justify-between items-center"
          >
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <TiTimes size={20} />
            </div>
            <div className="w-full text-center">
              <h4>افزودن کتاب</h4>
              <div className="h-[1px] bg-slate-200 w-full mt-5" />
            </div>

            <div className="inputsContainer h-full w-full py-5 text-center grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-16">
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>نام کتاب</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        name: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>کد کتاب</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        bookCode: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>دسته بندی</h4>
                  <Select
                    onChange={(e: any) =>
                      setNewBook({
                        ...newBook,
                        category: e.value,
                      })
                    }
                    id="category"
                    isSearchable={false}
                    className=" w-full"
                    // defaultValue={durationOption[1]}
                    options={categories}
                    placeholder="دسته بندی"
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>انتشارات</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        publisher: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>سال انتشار</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="number"
                    maxLength={3}
                    minLength={3}
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        publishYear: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>قفسه</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        publisher: e.target.value.toUpperCase(),
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>تعداد صفحات</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="number"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        pages: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full" htmlFor="">
                  <h4>تاریخ ثبت</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        createdAt: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="w-full">
                <label
                  className="text-right w-full flex flex-col gap-1"
                  htmlFor=""
                >
                  <h4>نویسنده</h4>
                  {athorList.map((athor, index) => (
                    <div key={index} className="flex relative">
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        name="athor"
                        value={athor.athor}
                        onChange={(e) => athorChangeHandler(index, e)}
                      />
                      {athorList.length - 1 === index && (
                        <button
                          onClick={addAthorHandler}
                          className=" absolute -left-7 h-[38px] w-7 flex justify-center items-center"
                        >
                          <RiAddCircleLine size={20} />
                        </button>
                      )}
                      {athorList.length > 1 && (
                        <button
                          className=" absolute left-0 h-[38px] w-7 flex justify-center items-center"
                          onClick={() => removeAthorHandler(index)}
                        >
                          <MdOutlineRemoveCircleOutline size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </label>
              </div>
              <div className="w-full">
                <label
                  className="text-right w-full flex flex-col gap-1"
                  htmlFor=""
                >
                  <h4>مترجم</h4>
                  {translatorlist.map((translator, index) => (
                    <div key={index} className="relative flex">
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        name="translator"
                        value={translator.translator}
                        onChange={(e) => translatorChangeHandler(index, e)}
                      />

                      {translatorlist.length - 1 === index && (
                        <button
                          onClick={addTranslatorHandler}
                          className=" absolute -left-7 h-[38px] w-7 flex justify-center items-center"
                        >
                          <RiAddCircleLine size={20} />
                        </button>
                      )}
                      {translatorlist.length > 1 && (
                        <button
                          className=" absolute left-0 h-[38px] w-7 flex justify-center items-center"
                          onClick={() => removeTranslatorHandler(index)}
                        >
                          <MdOutlineRemoveCircleOutline size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </label>
              </div>
            </div>

            <button
            onClick={fetchNewBook}
            className="w-full mt-10 bg-slate-700 text-white h-10 rounded hover:bg-slate-600">
              ثبت
            </button>
          </div>
          {/* </form> */}
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

export default BooksModal;
