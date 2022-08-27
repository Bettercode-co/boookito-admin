import React from "react";
import HeaderStats from "../components/Headers/HeaderStats";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import FooterAdmin from "../components/Footers/FooterAdmin";

import Sidebar from "../components/Sidebar/Sidebar";
import { LayoutProps } from "../interfaces";

const Admin: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Sidebar />
      <div className="relative border-red-500 w-max md:mr-64 mg:w-full bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-max -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
};

export default Admin;
