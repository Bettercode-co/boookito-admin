import { getCookie } from 'cookies-next';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TiTimes } from 'react-icons/ti';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const eventHandler = (e) => {
  e.stopPropagation();
};

enum RuleBase {
    STUDENT = 'STUDENT',
    PERSONNEL = 'PERSONNEL',
    MASTER = 'MASTER',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN'
};

enum UserStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    REJECT = 'REJECT'
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

type FormValues = {
  username: string;
  studentId: string;
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
  level: string;
  ruleBase: RuleBase;
  userStatus: UserStatus;
  // libraryId: string;
};

const UserModal = ({ setIsModalOpen, isModalOpen }) => {
    const [username, setUsername] = useState<string>(); // کد ملی
    const [studentId, setStudentId] = useState<string>(); // daneshjooii
    const [firstname, setFirstname] = useState<string>(); 
    const [lastname, setLastname] = useState<string>(); 
    const [password, setPassword] = useState<string>(); 
    const [phoneNumber, setPhoneNumber] = useState<string>(); 
    const [ruleBase, setRuleBase] = useState<RuleBase>(RuleBase.STUDENT); 
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.ACTIVE); 
    // const [libraryId, setLibraryId] = useState<number>(); 
    const [level, setLevel] = useState<string>();

    const userRules = [
      { label: 'ادمین', value: RuleBase.ADMIN },
      { label: 'استاد', value: RuleBase.MASTER },
      { label: 'کارمند', value: RuleBase.PERSONNEL },
      { label: 'دانشجو', value: RuleBase.STUDENT },
    ]

    const userStatuses = [
      { label: 'فعال', value: UserStatus.ACTIVE },
      { label: 'در انتظار', value: UserStatus.PENDING },
      { label: 'حذف شده', value: UserStatus.REJECT },
    ]

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormValues>();
    // /api/v2/admin/createuser

    const closeAndClearModal = () => {
      setIsModalOpen(false);
      setUsername(null);
      setStudentId(null);
      setFirstname(null);
      setLastname(null);
      setPassword(null);
      setPhoneNumber(null);
      setLevel(null);
      setRuleBase(RuleBase.STUDENT);
      setUserStatus(UserStatus.ACTIVE);
    };

    const fetchUser = (data, event) => {
      axiosInstance.post('admin/createuser',
      {
        ...data,
        password: data.studentId,
        ruleBase,
        userStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => notifySuccess("درخواست با موفقیت انجام شد"))
      .then(() => {
        event.target.reset();
        closeAndClearModal();
      })
      .catch((err) => {
        if (err.response.data.message.length > 1) {
          err.response.data.message.map((errMsg) => {
            notifyError(errMsg);
          });
        } else {
          notifyError(err.response.data.message[0]);
        }
      });
    }
    return (
      <>
      {isModalOpen && (
        <div
          className={`overflow-y-scroll md:overflow-hidden  w-full h-full  flex justify-center items-center fixed   bg-gray-300 bg-opacity-50 transition-all duration-300 ease-in`}
          onClick={closeAndClearModal}
        >
          {/* <form> */}
          <form
            onSubmit={handleSubmit((data, e) => {
              fetchUser(data, e);
            })}
            onClick={eventHandler}
            className="relative mt-[250vh] mb-[5vh] md:mt-0 w-full mx-10  rounded bg-white flex flex-col p-10  justify-between items-center"
          >
            <div
              onClick={closeAndClearModal}
              className="absolute right-5 top-5 cursor-pointer"
            >
              <TiTimes size={20} />
            </div>
            <div className="w-full text-center">
              <h4>افزودن کاربر</h4>
              <div className="h-[1px] bg-slate-200 w-full mt-5" />
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-10">
              {/* -------------------------------------FORM---------------------------------------------- */}
              <div className="inputsContainer h-full w-full py-5 text-center grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-16">
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                    <h4>نام</h4>
                    <input
                      className="w-full border-[#ccc] rounded h-[38px]"
                      type="text"
                      {...register("firstname", {
                        required: "نام را وارد کنید",
                      })}
                    />
                    {errors.firstname && (
                      <p className="absolute -bottom-8 text-sm text-rose-600">
                        {errors.firstname.message}
                      </p>
                    )}
                  </label>
                </div>
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                      <h4>نام خانوادگی</h4>
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        {...register("lastname", {
                          required: "نام خانوادگی را وارد کنید",
                        })}
                      />
                      {errors.lastname && (
                        <p className="absolute -bottom-8 text-sm text-rose-600">
                          {errors.lastname.message}
                        </p>
                      )}
                    </label>
                </div>
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                      <h4>کد ملی</h4>
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        {...register("username", {
                          required: "کد ملی را وارد کنید",
                        })}
                      />
                      {errors.username && (
                        <p className="absolute -bottom-8 text-sm text-rose-600">
                          {errors.username.message}
                        </p>
                      )}
                    </label>
                </div>
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                      <h4>شماره دانشجویی</h4>
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        {...register("studentId", {
                          required: "شماره دانشجویی را وارد کنید",
                        })}
                      />
                      {errors.studentId && (
                        <p className="absolute -bottom-8 text-sm text-rose-600">
                          {errors.studentId.message}
                        </p>
                      )}
                    </label>
                </div>
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                      <h4>شماره تماس</h4>
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        {...register("phoneNumber", {
                          required: "شماره تماس را وارد کنید",
                        })}
                      />
                      {errors.phoneNumber && (
                        <p className="absolute -bottom-8 text-sm text-rose-600">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </label>
                </div>
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                      <h4>مقطع تحصیلی</h4>
                      <input
                        className="w-full border-[#ccc] rounded h-[38px]"
                        type="text"
                        {...register("level", {
                          required: "مقطع تحصیلی را وارد کنید",
                        })}
                      />
                      {errors.level && (
                        <p className="absolute -bottom-8 text-sm text-rose-600">
                          {errors.level.message}
                        </p>
                      )}
                    </label>
                </div>
                <div className="w-full">
                  <label className="text-right w-full relative" htmlFor="">
                    <h4>انتخاب سطح دسترسی</h4>
                    <Select
                      onChange={(e) => setRuleBase(e.value)}
                      id="rule"
                      isSearchable={true}
                      className=" w-full"
                      options={userRules}
                      placeholder="دانشجو"
                    />
                  </label>
                </div>
                
              </div>
             
            </div>
            <button
              type="submit"
              className="w-full mt-10 bg-slate-700 text-white h-10 rounded hover:bg-slate-600"
            >
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
    )
}

export default UserModal