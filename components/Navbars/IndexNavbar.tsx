import React from "react";
import Link from "next/link";
// components
import IndexDropdown from "../Dropdowns/IndexDropdown";

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = React.useState<boolean>(false);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-green-800 text-sm font-bold leading-relaxed inline-block ml-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                Notus NextJS
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg/0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-slate-500 text-green-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index-navbar"
                >
                  Docs
                  <i className="text-slate-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:mr-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-slate-500 text-green-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="text-slate-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block mr-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-slate-500 text-green-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="text-slate-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block mr-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-slate-500 text-green-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index-navbar"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="text-slate-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block mr-2">Star</span>
                </a>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-green-800 text-white active:bg-green-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:ml-1 lg:mb-0 mr-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  Download <i className="fas fa-arrow-alt-circle-down"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
