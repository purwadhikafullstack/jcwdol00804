import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Page = ({ navTitle, isNavbar = true, isFooter = true, children }) => {
  return (
    <div
      className="flex flex-col items-center"
      style={{ backgroundColor: "#aad27d" }}
    >
      <div className="w-[480px] bg-white min-h-screen overflow-hidden">
        {isNavbar && <Navbar navTitle={navTitle} />}
        {children}
        {isFooter && <Footer />}
      </div>
    </div>
  );
};

export default Page;
