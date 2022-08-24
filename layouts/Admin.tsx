import React from "react";
import HeaderStats from "../components/Headers/HeaderStats";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import FooterAdmin from "../components/Footers/FooterAdmin";

import Sidebar from "../components/Sidebar/Sidebar";

const Admin: React.FC = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {/* {children} */}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
};

export default Admin;
