import React from "react";

import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";
import { LayoutProps } from "../interfaces";

const Auth: React.FC<LayoutProps> = (props) => {
  return (
    <>
      {/* <Navbar /> */}
      <main >
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/login/4907599.jpg')",
              backgroundSize: "cover"
            }}
          ></div>
          {props.children}
          {/* <FooterSmall absolute={true} /> */}
        </section>
      </main>
    </>
  );
};

export default Auth;
