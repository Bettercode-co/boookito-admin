/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { getCookie } from "cookies-next";
import { RuleBase, UserStatus } from "../../../../components/modals/UserModal";
import Select from "react-select";
import { toast } from "react-toastify";

export default function EditUserPage() {
  const [id, setId] = useState<number>(null);
  const [avatarSource, setAvatarSource] = useState<string>();
  const [firstname, setFirstname] = useState<string>(null);
  const [lastname, setLastname] = useState<string>(null);
  const [usernameSocial, setUsernameSocial] = useState<string>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>(null);
  const [studentId, setStudentId] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);
  const [level, setLevel] = useState<string>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>(null);
  const [ruleBase, setRuleBase] = useState<RuleBase>(null);

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
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });

  const userRules = [
    { label: "ادمین", value: RuleBase.ADMIN },
    { label: "استاد", value: RuleBase.MASTER },
    { label: "کارمند", value: RuleBase.PERSONNEL },
    { label: "دانشجو", value: RuleBase.STUDENT },
  ];

  const userStatuses = [
    { label: "فعال", value: UserStatus.ACTIVE },
    { label: "غیر فعال", value: UserStatus.PENDING },
  ];

  const getStatus = (us: UserStatus) => {
    const res = userStatuses.find((v) => {
      return v.value == us;
    });
    return res;
  };

  const getRule = (r: RuleBase) => {
    const res = userRules.find((v) => {
      return v.value == r;
    });
    return res;
  };

  const router = useRouter();
  const userId = router.query.id;
  const token = getCookie("accessToken");

  useEffect(() => {
    axiosInstance
      .get(`admin/userinfo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setAvatarSource(response.data.avatarSource);
        setFirstname(response.data.firstname);
        setId(response.data.id);
        setLastname(response.data.lastname);
        setLevel(response.data.level);
        setPhoneNumber(response.data.phoneNumber);
        setRuleBase(response.data.ruleBase);
        setUserStatus(response.data.userStatus);
        setStudentId(response.data.studentId);
        setUsername(response.data.username);
        setUsernameSocial(response.data.usernameSocial);
      });
  }, [userId, token]);

  const submit = async () => {
    const body = {
      id,
      username,
      firstname,
      lastname,
      studentId,
      avatarSource,
      level,
      phoneNumber,
      usernameSocial,
      userStatus,
      ruleBase,
    };
    console.log(body)
    axiosInstance
      .patch("admin/user/edit", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        notifySuccess("ادیت موفقیت امیز بود");
        setTimeout(() => {
          router.push("/admin/users");
        }, 1500);
      })
      .catch((err) => {
        if(!err.response.data) {
            // notifyError("در سرور مشکلی پیش امده")
        } else if (err.response.data.message.length > 1) {
          err.response.data.message.map((errMsg) => {
            notifyError(errMsg);
          });
        } else {
          notifyError(err.response.data.message[0] || "خطا");
        }
      });
  };

  return (
    <>
      {/* Card Section */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              حساب کاربری
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              حساب کاربری خود را ویرایش کنید
            </p>
          </div>
          <form>
            {/* Grid */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                  تصویر شما
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <div className="flex items-center gap-5">
                  <img
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src={avatarSource}
                    alt="Image Description"
                  />
                  <div className="flex gap-x-2"></div>
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  نام کامل
                </label>
                <div className="hs-tooltip inline-block">
                  <button type="button" className="hs-tooltip-toggle ml-1">
                    <svg
                      className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-full-name"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <input
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  شماره دانشجویی
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <input
                  id="af-account-email"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  مقطع تحصیلی
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <input
                  id="af-account-email"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  ایدی شبکه اجتماعی
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <input
                  id="af-account-email"
                  type="text"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  value={usernameSocial}
                  onChange={(e) => setUsernameSocial(e.target.value)}
                />
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  کدملی
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-password"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    شماره تماس
                  </label>
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-phone"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <select className="py-2 px-3 pr-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    <option selected>98+</option>
                  </select>
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  وضعیت
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <div className="sm:flex">
                  <Select
                    onChange={(e) => setUserStatus(e.value)}
                    id="status"
                    isSearchable={false}
                    className=" w-full"
                    options={userStatuses}
                    value={getStatus(userStatus)}
                  />
                </div>
              </div>
              {/* End Col */}
              <div className="col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  سطح دسترسی
                </label>
              </div>
              {/* End Col */}
              <div className="col-span-9">
                <div className="sm:flex">
                  <Select
                    onChange={(e) => setRuleBase(e.value)}
                    id="status"
                    isSearchable={false}
                    className=" w-full"
                    options={userRules}
                    value={getRule(ruleBase)}
                  />
                </div>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-700 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                بیخیال بابا
              </button>
              <button
                type="button"
                onClick={() => submit()}
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                ذخیره تغییرات
              </button>
            </div>
          </form>
        </div>
        {/* End Card */}
      </div>
      {/* End Card Section */}
    </>
  );
}
