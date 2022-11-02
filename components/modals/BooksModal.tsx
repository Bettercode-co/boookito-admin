import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";

//react icons
import { RiAddCircleLine } from "react-icons/ri";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { TiTimes } from "react-icons/ti";
import axiosInstance from "../../utils/axiosInstance";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "jalali-react-datepicker";

import addImage from '../../public/img/book_modal/addImage.png'
import Image from "next/image";
import axios from "axios";

type AthorListType = {
  athor: string;
};
type TranslatorlistType = {
  translator: string;
};
type Category = {
  value: number;
  label: string;
}
type FormValues = {
  bookName:string;
  // authorName:string[];
  // translatorName:string[];
  publisherName:string;
  yearPublish:number;
  numberPage:number;
  // categoryId:number;
  // description?:string;
  shelfName:string;
  // registeredAt:Date;
  // privateId:number;
  totalEntity: number;
  shabak: string;
  // libraryId:number
}

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
const notifySuccess = (msg) =>
  toast.success(msg, {
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
  const [categories, setCategories] = useState<Category[]>([])
  const [newBook, setNewBook] = useState({});
  const [imageLink, setImageLink] = useState<string>('')
  const [newImage, setNewImage] = useState(null)
  const [isImageUplaoded, setIsImageUplaoded] = useState<boolean>(false)

  const { register, handleSubmit, formState: {errors} } = useForm<FormValues>()
  
  const inputImageUploadeRef = React.useRef(null)
  const triggerRef = () => inputImageUploadeRef.current.click()

  const inputUploadHandler = (event) => {
    const formData = new FormData()
    setNewImage(URL.createObjectURL(event.target.files[0]))
    if(event.target.files[0] && event.target.files){
            formData.append("file" , event.target.files[0])
            imageUploader(formData)
    }     
  }

  const imageUploader = (formImage) => {
    setIsImageUplaoded(true)
    axios.post(' https://core.boookito.ir/image/upload', formImage, {
    headers: {
       authorization : "c4a12f24ceabef771459150b0a953e81e3776a41800798e27808b87c95dd3b0c31" 
    }
  }).then(res => setImageLink(res.data.link))
    .then(() => notifySuccess("عکس با موفقیت آپلود شد"))
    .catch((err) => {
      if(err.response.data.message.length > 1){
        err.response.data.message.map(errMsg => {
          notifyError(errMsg)
        })
      }else{
        notifyError(err.response.data.message[0])
      }
    })
    .finally(() => setIsImageUplaoded(false))
  }

  const closeAndClearModal = () => {
    setIsModalOpen(false)
    setNewBook({})
    setAthorList([{ athor: "" }])
    setTranslatorList([
      { translator: "" },
    ])
    setImageLink('')
    setNewImage(null)
  }
  


  useEffect(() => {
    fetchCategory()
  },[])

  useEffect(() => {
    setNewBook({
      ...newBook,
      authorName :ObjectArrayToStringArray(athorList) ,
      translatorName:ObjectArrayToStringArray(translatorlist) ,
      // imageSource: newImage
    })

},[athorList, translatorlist, newImage ])

  const ObjectArrayToStringArray = (objectArray) => {
  const stringArray = objectArray.map(obj => Object.values(obj)[0])
  return stringArray
  }

  const fetchNewBook = (data) => {
    const allData = imageLink ? {...newBook, ...data, shelfName: data.shelfName.toUpperCase() , imageSource: imageLink} : {...newBook, ...data, shelfName: data.shelfName.toUpperCase()}
        axiosInstance
          .post("admin/newbook", allData , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => notifySuccess("درخواست با موفقیت انجام شد"))
          .then(() => closeAndClearModal())
          .catch((err) => {
            if(err.response.data.message.length > 1){
              err.response.data.message.map(errMsg => {
                notifyError(errMsg)
              })
            }else{
               notifyError(err.response.data.message[0])
            }
          })
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
    await axiosInstance.get('admin/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
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
    // console.log(athorList);
  };
  const translatorChangeHandler = (index, e) => {
    const values = [...translatorlist];
    values[index][e.target.name] = e.target.value;
    setTranslatorList(values);
    // console.log(translatorlist);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={`overflow-y-scroll md:overflow-hidden  w-full h-full  flex justify-center items-center fixed   bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={closeAndClearModal}
        >
          {/* <form> */}
          <form
            onSubmit={handleSubmit((data) => {fetchNewBook(data)})}
            onClick={eventHandler}
            className="relative mt-[100vh] mb-[5vh] md:mt-0 w-full mx-10  rounded bg-white flex flex-col p-10  justify-between items-center"
          >
            <div
              onClick={closeAndClearModal}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <TiTimes size={20} />
            </div>
            <div className="w-full text-center">
              <h4>افزودن کتاب</h4>
              <div className="h-[1px] bg-slate-200 w-full mt-5" />
            </div>


            <div className="w-full flex flex-col lg:flex-row gap-10">
{/* -------------------------------------FORM---------------------------------------------- */}
            <div  className="inputsContainer h-full w-full py-5 text-center grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-16">
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>نام کتاب</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    {...register('bookName', {required: 'نام کتاب را وارد کنید'})}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     name: e.target.value,
                    //   })
                    // }
                  />
                  {errors.bookName && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.bookName.message}</p>}
                </label>
              </div>
              {/* <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>کد کتاب</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="number"
                    {...register('privateId', {valueAsNumber: true, required:"کد کتاب را وارد کنید" })}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     bookCode: e.target.value,
                    //   })
                    // }
                  />
                  {errors.privateId && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.privateId.message}</p>}
                </label>
              </div> */}
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>دسته بندی</h4>
                  <Select
                  // {...register('categoryId')}
                    onChange={(e: any) =>
                      setNewBook({
                        ...newBook,
                        categoryId: e.value,
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
                <label className="text-right w-full relative" htmlFor="">
                  <h4>انتشارات</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    {...register('publisherName', {required: "نام انتشارات را وارد کنید"})}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     publisher: e.target.value,
                    //   })
                    // }
                  />
                  {errors.publisherName && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.publisherName.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>سال انتشار</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-xs"
                    type="number"
                    {...register('yearPublish', {valueAsNumber: true, maxLength: 4, minLength:4, required: 'سال انتشار را وارد کنید' })}
                    placeholder='سال انتشار را بصورت چهار رقمی وارد کنید'
                    // maxLength={4}
                    // minLength={4}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     publishYear: e.target.value,
                    //   })
                    // }
                  />
                  {errors.yearPublish && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.yearPublish.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>قفسه</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    {...register('shelfName', {required: 'نام قفسه را وارد کنید'})}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     publisher: e.target.value.toUpperCase(),
                    //   })
                    // }
                  />
                  {errors.shelfName && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.shelfName.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>تعداد صفحات</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="number"
                    {...register('numberPage', {valueAsNumber: true, required:'تعداد صفحات کتاب را وارد کنید' })}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     pages: e.target.value,
                    //   })
                    // }
                  />
                  {errors.numberPage && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.numberPage.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>تاریخ ثبت</h4>
                  {/* <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        createdAt: e.target.value,
                      })
                    }
                  /> */}
                   <DatePicker
                    className="w-full border border-[#ccc] rounded h-[38px] px-2"
                    timePicker={false} 
                    onClickSubmitButton={value => setNewBook({
                    ...newBook,
                    registeredAt: new Date( value.value._d  ).toISOString()
                  })} />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>تعداد جلد</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="number"
                    {...register('totalEntity', {valueAsNumber: true})}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     no: e.target.value,
                    //   })
                    // }
                  />
                </label>
              </div>              
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>شماره شابک</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px]"
                    type="text"
                    {...register('shabak', {required: 'شماره شابک را وارد کنید'})}
                    // onChange={(e) =>
                    //   setNewBook({
                    //     ...newBook,
                    //     shabak: e.target.value,
                    //   })
                    // }
                  />
                  {errors.shabak && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.shabak.message}</p>}
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
            {/* START---------------------------------IMAGE UPLOADER-------------------------- */}
        <div className="w-full md:w-96 flex flex-col items-center justify-center gap-5">
        <Image src={newImage? newImage : addImage} width={200} height={200} alt='add_image' />
        {isImageUplaoded && (
        <svg
        className="animate-spin h-14 w-14 mx-auto text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx={12}
          cy={12}
          r={10}
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg> 
        )}
        <input type="file" accept="image/*" ref={inputImageUploadeRef} onChange={inputUploadHandler} className='hidden' />
        <button type="button" className="text-white bg-slate-500 border-white hover:drop-shadow-xl drop-shadow rounded-md hover:bg-white hover:text-slate-700 hover:border-2 hover:border-slate-700 transition-all border-2 px-4 py-1" onClick={triggerRef} >انتخاب عکس</button>
        </div>
            {/* END---------------------------------IMAGE UPLOADER-------------------------- */}

            </div>
            <button
            type="submit"
            // onClick={fetchNewBook}
            className="w-full mt-10 bg-slate-700 text-white h-10 rounded hover:bg-slate-600">
              ثبت
            </button>
          </form>
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
