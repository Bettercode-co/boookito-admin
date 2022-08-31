import React from "react";
import CardProfile from "../../components/Cards/CardProfile";
import CardSettings from "../../components/Cards/CardSettings";

import Admin from "../../layouts/Admin";

 function Settings() {
  return (
      <div  className="flex flex-wrap pt-8">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
  );
}

(Settings as any).layout = Admin

export default Settings
