import React from "react";
import { LayoutProps } from "../interfaces";
import Link from "next/link";
const Auth: React.FC<LayoutProps> = (props) => {
  return (
    <>
      {/* <Navbar /> */}
      <main>
      <a href="https://boookito.betteruptime.com">
       <div
          className="flex items-center mx-auto  text-blue-500 justify-center text-center font-bold px-4 py-3"
          role="alert"
        >
          <p>شما میتوانید وضعیت سرورها را از اینجا دنبال کنید</p>
        </div>
        </a>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/login/4907599.jpg')",
              backgroundSize: "cover",
            }}
          ></div>
          {props.children}
        </section>
      </main>
    </>
  );
};

export default Auth;
