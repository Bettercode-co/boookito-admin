import React from "react";
import { LayoutProps } from "../interfaces";
import Link from "next/link";
const Auth: React.FC<LayoutProps> = (props) => {
  return (
    <>
      {/* <Navbar /> */}
      <main>
    
        <section className="relative w-full h-full py-40 min-h-screen">
        
          {props.children}
        </section>
      </main>
    </>
  );
};

export default Auth;
