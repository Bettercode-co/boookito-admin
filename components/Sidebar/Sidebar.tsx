import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBars,
  FaTv,
  FaTools,
  FaTimes,
  FaNewspaper,
  FaUserCircle,
} from "react-icons/fa";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";

const Sidebar: React.FC = () => {
  const [collapseShow, setCollapseShow] = React.useState<string>("hidden");
  const router = useRouter();

  return (
    <nav className="  md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
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
            className="md:block text-right md:pb-2 text-slate-600 ml-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          >
            داشبورد پورتال
          </a>
        </Link>
        {/* User */}
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative">
            <NotificationDropdown />
          </li>
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
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link href="/">
                  <a
                    href="#pablo"
                    className="md:block text-right md:pb-2 text-slate-600 ml-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Notus NextJS
                  </a>
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
                className="border px-3 py-2 h-12 border-solid  border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
              />
            </div>
          </form>

          


          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
          {/* Heading */}
          <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            منو ها
          </h6>
          {/* Navigation */}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li className="items-center">
              <Link href="/admin/dashboard">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-xs uppercase py-3 font-bold  " +
                    (router.pathname.indexOf("/admin/dashboard") !== -1
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <FaTv
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  داشبورد
                </a>
              </Link>
            </li>

            

            <li className="items-center">
              <Link href="/admin/customers">
                <a
                  href="#pablo"
                  className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold flex items-center"
                >
                  <FaNewspaper className="fas fa-newspaper text-slate-400 ml-2 text-sm" />
                  مشتریان
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/category">
                <a
                  href="#pablo"
                  className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold flex items-center"
                >
                  <FaUserCircle className="fas fa-user-circle text-slate-400 ml-2 text-sm" />
                  انواع صنعت
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/settings">
                <a
                  href="#pablo"
                  className={
                    "flex items-center text-xs uppercase py-3 font-bold " +
                    (router.pathname.indexOf("/admin/settings") !== -1
                      ? "text-sky-500 hover:text-sky-600"
                      : "text-slate-700 hover:text-slate-500")
                  }
                >
                  <FaTools
                    className={
                      " ml-2 text-lg " +
                      (router.pathname.indexOf("/admin/settings") !== -1
                        ? "opacity-75"
                        : "text-slate-300")
                    }
                  />
                  تنظیمات
                </a>
              </Link>
            </li>

          </ul>



        </div>
      </div>
    </nav>
  );
};

export default Sidebar;