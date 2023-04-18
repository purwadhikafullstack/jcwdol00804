import React from "react";
import Page from "../../Components/Page";

const Payment = () => {
  return (
    <Page isFooter={false} isNavbar={false}>
      <div className="text-center text-xl py-5 font-bold z-10 relative">
        Payment
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="flex flex-col px-5 mt-2">
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-5 ">
            <div className="text-slate-400  text-center px-5 font-bold">
              INV/20230423/XM/000000001
            </div>
            <div className="text-slate-400  text-center px-5 font-bold">
              Order Date : 23 April 2023 23:11
            </div>
          </div>
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-5 ">
            <div className="font-bold px-5 text-center">
              Payment Time Left Before Canceled
            </div>
            <div className="text-[40px] text-red-500 text-center font-bold">
              22:23:21
            </div>
          </div>
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-10 ">
            <div></div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <button className="bg-slate-300  w-4/12 h-[30px] mr-2 rounded-full px-3 text-[16px] font-[600] shadow-md ">
            Back To Order
          </button>
          <button className="bg-[#82cd47] w-4/12 h-[30px] mr-2 rounded-full px-3 text-white text-[16px] font-[600] shadow-md ">
            Upload Receipt
          </button>
        </div>
      </div>
    </Page>
  );
};

export default Payment;
