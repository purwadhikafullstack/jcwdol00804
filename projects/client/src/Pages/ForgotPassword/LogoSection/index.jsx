import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../Assets/logo-xmart.png";
import slogan from "../../../Assets/xmart.png";

const LogoSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row mt-[32px] justify-center items-center">
        <img src={logo} alt="logo" className="w-12 h-12 mr-3" />
        <img
          src={slogan}
          alt="slogan"
          className="w-20 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-7/12 -translate-y-4 mx-auto">
        <div className="font-calligraphy text-center text-[40px] leading-none text-[#689C36] font-semibold">
          Providing you the best grocery shopping experience
        </div>
      </div>
    </>
  );
};

export default LogoSection;
