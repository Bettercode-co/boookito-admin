import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppContext } from "../components/context/AppContext";
import HeaderStats from "../components/Headers/HeaderStats";
import AdminNavbar from "../components/Navbars/AdminNavbar";
// import FooterAdmin from "../components/Footers/FooterAdmin";

import Sidebar from "../components/Sidebar/Sidebar";
import { LayoutProps } from "../interfaces";

const Admin: React.FC<LayoutProps> = ({ children }) => {
  const {isHeaderStats, setIsHeaderStats} = useAppContext()
  const router = useRouter()
  

  useEffect(()=> {
    router.route === "/admin/dashboard" ? setIsHeaderStats(true) : isHeaderStats === false ? isHeaderStats : setIsHeaderStats(false)
  },[router.route, isHeaderStats, setIsHeaderStats])


  return (
    <div className="">
      <Sidebar />
      <div className="content relative mg:w-full w-max md:mr-64  bg-slate-100 ">
        <AdminNavbar />
        {/* Header */}
        {isHeaderStats ? <HeaderStats /> : null}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-max -m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .content {
            margin-right: 16rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
