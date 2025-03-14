import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/img/dashboard/logo.svg";
import { deleteCookie } from "cookies-next";

//react icons
import { FaBars, FaTv, FaTimes, FaUsers } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { HiServer } from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { TbTruckLoading } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";

import UserDropdown from "../Dropdowns/UserDropdown";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [collapseShow, setCollapseShow] = React.useState<string>("hidden");
  const router = useRouter();

  const logoutHandler = () => {
    deleteCookie("accessToken");
    deleteCookie("ruleBase");
    router.push("/auth/login");
  };
  return (
    <nav className="  md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-[#121621] flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <FaBars />
        </button>
        {/* Brand */}
        <Link href="/">
          <a
            href="#pablo"
            className="h-10 md:block text-center md:pb-2 text-slate-200 ml-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0  "
          >
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={40}
              className="absolute top"
            />
          </a>
        </Link>
        {/* User */}
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative">
            <UserDropdown />
          </li>
        </ul>
        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className=" md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link href="/">
                  <a
                    href="#pablo"
                    className="md:block text-right md:pb-2 text-slate-200 ml-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  ></a>
                </Link>
              </div>
              <div className="w-6/12 flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
          {/* Form */}
          <form className="mt-6 mb-4 md:hidden">
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Search"
                className="border px-3 py-2 h-12 border-solid  border-slate-500 placeholder-slate-300 text-slate-200 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
              />
            </div>
          </form>

          {/* Divider */}
          <hr className="my-10  w-full" />
          {/* Heading */}

          {/* Navigation */}

          <ul className="md:flex-col mt-5 md:min-w-full gap-2 flex flex-col list-none md:mb-4">
            <li className="items-center">
              <Link href="/admin/dashboard">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-base  uppercase py-3 font-semibold  " +
                    (router.pathname.indexOf("/admin/dashboard") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-slate-200 hover:text-slate-300")
                  }
                >
                  <FaTv
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-slate-200")
                    }
                  />
                  داشبورد
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/books">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-base  uppercase py-3 font-semibold " +
                    (router.pathname.indexOf("/admin/books") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-slate-200 hover:text-slate-300")
                  }
                >
                  <ImBooks
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/books") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  کتاب ها
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/users">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-base  uppercase py-3 font-semibold " +
                    (router.pathname.indexOf("/admin/users") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-slate-200 hover:text-slate-300")
                  }
                >
                  <FaUsers
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/users") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  کاربران
                </a>
              </Link>
            </li>
            <li className="items-center">
              <Link href="/admin/categories">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-base  uppercase py-3 font-semibold " +
                    (router.pathname.indexOf("/admin/categories") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-slate-200 hover:text-slate-300")
                  }
                >
                  <BiCategoryAlt
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/categories") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  دسته بندی ها
                </a>
              </Link>
            </li>
            <li className="items-center">
              <Link href="/admin/orders">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-base  uppercase py-3 font-semibold " +
                    (router.pathname.indexOf("/admin/orders") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-slate-200 hover:text-slate-300")
                  }
                >
                  <TbTruckLoading
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/orders") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  امانات
                </a>
              </Link>
            </li>



            <li className="items-center">
              <div onClick={logoutHandler} className="cursor-pointer">
                <div
                  className={
                    "flex items-center text-base  uppercase py-3 font-semibold " +
                    (router.pathname.indexOf("/admin/settings") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-slate-200 hover:text-slate-300")
                  }
                >
                  <MdExitToApp
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/settings") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  خروج
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
