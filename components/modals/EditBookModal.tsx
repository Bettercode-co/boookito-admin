import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
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
  publisherName:string;
  yearPublish:number;
  numberPage:number;
  shelfName:string;
  totalEntity: number;
  shabak: string;
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

const EditBooksModal = ({ setIsEditModalOpen, isEditModalOpen, rowDataId }) => {
    const [bookData, setBookData] = useState<any>()
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
    .finally(() => setIsImageUplaoded(false))
  }

  const closeAndClearModal = () => {
    setIsEditModalOpen(false)
    setNewBook({})
    setAthorList([{ athor: "" }])
    setTranslatorList([
      { translator: "" },
    ])
    setImageLink('')
    setNewImage(null)
  }

  const getBookData = (id) => {
    axiosInstance.get(`admin/book/search/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => bookInputHandler(res.data[0]))
}

  const bookInputHandler = async(data) => {
        let authorListArray = await data.authorName.map((author) => {
            return({
                athor: author
            })
        })
        setAthorList(authorListArray)

        let translateListArray = await data.translatorName.map((trnaslate) => {
            return({
                translator: trnaslate 
            })
        })
        setTranslatorList(translateListArray)

        setBookData({
            ...bookData,
            bookName: data.bookName,
            publisherName: data.publisherName,
            yearPublish: data.yearPublish,
            shelfName: data.shelfName,
            numberPage: data.numberPage,
            totalEntity: data.totalEntity,
            shabak: data.shabak,
            categoryId: data.categoryId,
            imageSource: data.imageSource
        })
}


  useEffect(() => {
    getBookData(rowDataId)
    fetchCategory()
  },[isEditModalOpen])


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

  const fetchEditBook = (data, id) => {
    const allData = imageLink ? {...newBook, ...data, shelfName: data.shelfName.toUpperCase() , imageSource: imageLink} : {...newBook, ...data, shelfName: data.shelfName.toUpperCase()}
        axiosInstance
          .patch(`admin/editbook/${id}`, allData, {
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
          });
      
    
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
  };
  const translatorChangeHandler = (index, e) => {
    const values = [...translatorlist];
    values[index][e.target.name] = e.target.value;
    setTranslatorList(values);
  };


  return (
    <>
      {isEditModalOpen && (
        <div
          className={`overflow-y-scroll md:overflow-hidden  w-full h-full  flex justify-center items-center fixed   bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={closeAndClearModal}
        >
          {/* <form> */}
          <form
            onSubmit={handleSubmit((data) => {fetchEditBook(data, rowDataId)})}
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
              <h4>ویرایش کتاب</h4>
              <div className="h-[1px] bg-slate-200 w-full mt-5" />
            </div>


            <div className="w-full flex flex-col lg:flex-row gap-10">
{/* -------------------------------------FORM---------------------------------------------- */}
            <div  className="inputsContainer h-full w-full py-5 text-center grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-16">
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>نام کتاب</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="text"
                    {...register('bookName', {required: 'نام کتاب را وارد کنید'})}
                    placeholder={bookData.bookName}
                  />
                  {errors.bookName && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.bookName.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>دسته بندی</h4>
                  <Select
                    onChange={(e: any) =>
                      setNewBook({
                        ...newBook,
                        categoryId: e.value,
                      })
                    }
                    id="category"
                    isSearchable={false}
                    className=" w-full"
                    options={categories}
                    placeholder="دسته بندی"
                    defaultValue={categories.filter(cat => cat.value === bookData.categoryId)}
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>انتشارات</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="text"
                    {...register('publisherName', {required: "نام انتشارات را وارد کنید"})}
                    placeholder={bookData.publisherName}
                  />
                  {errors.publisherName && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.publisherName.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>سال انتشار (بصورت چهار رقمی)</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="number"
                    {...register('yearPublish', {valueAsNumber: true, maxLength: 4, minLength:4, required: 'سال انتشار را وارد کنید' })}
                    placeholder={bookData.yearPublish}
                    // placeholder='سال انتشار را بصورت چهار رقمی وارد کنید'
                  />
                  {errors.yearPublish && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.yearPublish.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>قفسه</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="text"
                    {...register('shelfName', {required: 'نام قفسه را وارد کنید'})}
                    placeholder={bookData.shelfName}
                  />
                  {errors.shelfName && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.shelfName.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>تعداد صفحات</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="number"
                    {...register('numberPage', {valueAsNumber: true, required:'تعداد صفحات کتاب را وارد کنید' })}
                    placeholder={bookData.numberPage}

                  />
                  {errors.numberPage && <p className="absolute -bottom-8 text-sm text-rose-600">{errors.numberPage.message}</p>}
                </label>
              </div>
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>تاریخ ثبت</h4>
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
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="number"
                    {...register('totalEntity', {valueAsNumber: true})}
                    placeholder={bookData.totalEntity}
                  />
                </label>
              </div>              
              <div className="w-full">
                <label className="text-right w-full relative" htmlFor="">
                  <h4>شماره شابک</h4>
                  <input
                    className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
                    type="text"
                    {...register('shabak', {required: 'شماره شابک را وارد کنید'})}
                    placeholder={bookData.shabak}
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
                        className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
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
                        className="w-full border-[#ccc] rounded h-[38px] placeholder:text-sm placeholder:text-slate-400"
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
        <Image src={newImage ? newImage : bookData.imageSource? bookData.imageSource : addImage} width={200} height={200} alt='add_image' />
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
        <button type="button" className="text-white bg-slate-500 border-white drop-shadow hover:drop-shadow-xl rounded-md hover:bg-white hover:text-slate-700 hover:border-2 hover:border-slate-700 transition-all border-2 px-4 py-1" onClick={triggerRef} >انتخاب عکس</button>
        </div>
            {/* END---------------------------------IMAGE UPLOADER-------------------------- */}

            </div>
            <button
            type="submit"
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

export default EditBooksModal;
