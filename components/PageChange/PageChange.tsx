import React from "react";
import Loading from "./Loading";
import LoadingComponent from "../spinner/Loading";

const PageChange: React.FC = () => {
  return (
    <div>
      <div className="bg-cover h-screen fixed z-40 w-full  top-0 right-0"></div>
      <div className="top-0 right-0 w-full h-full block z-50 absolute bg-[#121621] bg/50"></div>
      <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
        <div className="block mb-4">
          <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
        </div>
        <h4 className="text-lg font-medium text-white">
          صبر کنید ...
          <LoadingComponent />
        </h4>
      </div>
    </div>
  );
};

export default PageChange;
