import React from "react";
import { Link } from "react-router-dom";

const ModalAddress = ({
  isModalAddress,
  modalOpener,
  addressList,
  setAddress,
  setCourier,
}) => {
  return (
    <>
      {isModalAddress && (
        <div className="container flex justify-center mx-auto">
          <div className="fixed inset-0 flex items-start pt-[10%] justify-center bg-gray-700 bg-opacity-50 z-10">
            <div className="max-w-sm  p-6 bg-white divide-y divide-gray-500 w-[80%]">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">Select Address</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  cursor="pointer"
                  onClick={() => modalOpener(!isModalAddress)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-col mt-1">
                {addressList.map((val, idx) => {
                  return (
                    <div
                      key={idx}
                      className="shadow-md w-full text-center py-2 px-1 rounded-lg mt-4 border cursor-pointer hover:bg-emerald-100/[.5]"
                      onClick={() => {
                        setAddress(val);
                        setCourier({});
                        modalOpener(!isModalAddress);
                      }}
                    >
                      {val.is_main ? (
                        <div className="bg-red-500/[.5] w-[40%] rounded-full text-sm font-semibold mx-auto">
                          Main Address
                        </div>
                      ) : null}
                      <div>{val.address}</div>
                      <div>{`${val.city}, ${val.province}, ${val.zipcode}`}</div>
                    </div>
                  );
                })}
                <Link
                  to="/add-address"
                  className="bg-emerald-200 w-[50%] self-center text-center mt-5 rounded-lg py-[2px] font-[600]"
                >
                  Add Address
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAddress;
