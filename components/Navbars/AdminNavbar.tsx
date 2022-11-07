import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="relative top-0 right-0 w-full z-10 bg-slate-800 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:mr-auto ml-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"></span>
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};
export default Navbar;
