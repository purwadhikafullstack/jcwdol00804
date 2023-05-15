import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../Actions/user";
import logo from "../Assets/xmart.png";
import { BsTags, BsShop } from "react-icons/bs";
import { BiCategoryAlt, BiReceipt, BiGitBranch } from "react-icons/bi";
import { TbDiscount2, TbReportMoney, TbArrowsExchange2 } from "react-icons/tb";
import { GiQueenCrown } from "react-icons/gi";
import { Avatar } from "@chakra-ui/avatar";
import { toogleSideBarAction } from "../Actions/admin";

const PageAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role_id, profile_img, name, email, branch_name, sidebar } =
    useSelector((state) => {
      return {
        role_id: state.userReducer.role_id,
        profile_img: state.userReducer.profile_img,
        name: state.userReducer.name,
        email: state.userReducer.email,
        branch_name: state.userReducer.branch_name,
        sidebar: state.adminReducer.toogleSideBar,
      };
    });
  return (
    <div className="flex">
      {!sidebar ? (
        // Sidebar Tutup
        <div className="w-[5%] flex flex-col min-h-screen p-3 bg-gray-800 shadow duration-200">
          <div className="space-y-3">
            <div className="flex justify-center mr-1">
              <button onClick={() => dispatch(toogleSideBarAction(true))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
            </div>
            {/* Menu */}
            <div className="flex justify-center">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Link
                    to="/admin"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </Link>
                </li>
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-product"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BsTags className="w-6 h-5 text-gray-100" />
                    </Link>
                  </li>
                ) : (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-branch"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiGitBranch className="w-6 h-6 text-gray-100" />
                    </Link>
                  </li>
                )}
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-category"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiCategoryAlt className="w-6 h-6 text-gray-100" />
                    </Link>
                  </li>
                ) : null}
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-order"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiReceipt className="w-6 h-6 text-gray-100" />
                    </Link>
                  </li>
                ) : (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/order-report"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiReceipt className="w-6 h-6 text-gray-100" />
                    </Link>
                  </li>
                )}
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="#"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <TbDiscount2 className="w-6 h-6 text-gray-100" />
                    </Link>
                  </li>
                ) : null}
                <li className="rounded-sm">
                  <Link
                    to="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <TbReportMoney className="w-6 h-6 text-gray-100" />
                  </Link>
                </li>
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/stock-movement-report"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <TbArrowsExchange2 className="w-6 h-6 text-gray-100" />
                    </Link>
                  </li>
                ) : null}
                <li className="rounded-sm">
                  <button
                    onClick={() => {
                      dispatch(logoutAction());
                      navigate("/sign-in");
                    }}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // Sidebar Buka
        <div className="w-[22%] flex flex-col min-h-screen p-3 bg-gray-800 shadow duration-300">
          <div className="space-y-3">
            <div className="flex flex-row items-center justify-between">
              <img
                src={logo}
                alt="logo"
                className="w-14 h-14 top-[.5px] left-4 absolute"
              />
              <h2 className="text-xl font-bold text-white ml-16">Dashboard</h2>
              <button onClick={() => dispatch(toogleSideBarAction(false))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
            </div>
            {/* Admin Info */}
            <div className="flex flex-col items-center">
              <Avatar
                src={profile_img && `http://localhost:8000/${profile_img}`}
                name={name}
                className="bg-slate-300 text-xs mt-3"
                borderRadius="50%"
                w="35px"
                h="35px"
              />
              <span className="text-gray-100 text-sm mt-2 font-bold">
                {name}
              </span>
              {role_id === 2 ? (
                <>
                  <span className="text-gray-300 text-xs mt-2 font-bold truncate w-full text-center">
                    <BsShop className="inline mb-1 mr-[1px]" />{" "}
                    {branch_name && branch_name}
                  </span>
                  <div className="text-gray-300 text-xs font-bold">
                    Branch Admin
                  </div>
                </>
              ) : (
                <span className="text-gray-300 text-xs mt-1 font-bold flex flex-row items-center">
                  <GiQueenCrown className="inline mr-[2px]" size={16} />
                  Xmart Super Admin
                </span>
              )}
              <span className="text-gray-300 text-xs mt-1 font-bold w-full text-center truncate">
                {email}
              </span>
            </div>
            {/* Menu */}
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Link
                    to="/admin"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="text-gray-100">Home</span>
                  </Link>
                </li>
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-product"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BsTags className="w-6 h-5 text-gray-100" />
                      <span className="text-gray-100">Manage Product</span>
                    </Link>
                  </li>
                ) : (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-branch"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiGitBranch className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">Manage Branch</span>
                    </Link>
                  </li>
                )}
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-category"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiCategoryAlt className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">Manage Category</span>
                    </Link>
                  </li>
                ) : null}
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/manage-order"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiReceipt className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">Manage Order</span>
                    </Link>
                  </li>
                ) : (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/order-report"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiReceipt className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">Order Report</span>
                    </Link>
                  </li>
                )}
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="#"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <TbDiscount2 className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">Manage Discount</span>
                    </Link>
                  </li>
                ) : null}
                <li className="rounded-sm">
                  <Link
                    to="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <TbReportMoney className="w-6 h-6 text-gray-100" />
                    <span className="text-gray-100">Sales Report</span>
                  </Link>
                </li>
                {role_id === 2 ? (
                  <li className="rounded-sm">
                    <Link
                      to="/admin/stock-movement-report"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <TbArrowsExchange2 className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">
                        Stock Movement Report
                      </span>
                    </Link>
                  </li>
                ) : null}
                <li className="rounded-sm">
                  <button
                    onClick={() => {
                      dispatch(logoutAction());
                      navigate("/sign-in");
                    }}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-gray-100">Sign out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="px-5 py-4 w-full">{children}</div>
    </div>
  );
};

export default PageAdmin;
