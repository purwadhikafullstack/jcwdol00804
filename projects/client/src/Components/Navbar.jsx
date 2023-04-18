import React, { useState } from "react";
import {
  BiMenuAltLeft,
  BiChevronsLeft,
  BiShoppingBag,
  BiCartAlt,
  BiLogOut,
  BiLogIn,
} from "react-icons/bi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logoutAction } from "../Actions/user";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/avatar";

const Navbar = ({ navTitle, isLogged }) => {
  const [nav, setNav] = useState(false);
  const { id, profile_img, name } = useSelector((state) => {
    return {
      id: state.userReducer.id,
      profile_img: state.userReducer.profile_img,
      name: state.userReducer.name,
    };
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutClick = () => {
    localStorage.removeItem("xmart_login");
    dispatch(logoutAction());
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-row justify-between items-center px-5 py-5">
      <div>
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <BiMenuAltLeft size={30} />
        </div>
        {/* Overlay */}
        {nav ? (
          <div className="bg-black/75 fixed w-[460px] h-screen z-10 top-0"></div>
        ) : (
          ""
        )}
        {/* Sidebar */}
        <div
          className={
            nav
              ? "bg-white fixed top-0 w-[230px] h-screen z-10 px-3 -translate-x-5 "
              : "bg-white fixed top-0 w-[230px] h-screen z-10 left-[-100%]"
          }
        >
          <BiChevronsLeft
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-5 top-5 cursor-pointer"
          />
          <Link to="/">
            <div className="text-xl font-bold py-5 px-2">Xmart</div>
          </Link>
          <nav className="text-lg font-semibold px-2">
            <ul className="flex flex-col text-gray-600">
              <Link to="/product-list">
                <li className="flex py-2 items-center">
                  <BiShoppingBag size={24} className="mr-4" />
                  Products
                </li>
              </Link>
              {id && (
                <Link to="/my-cart">
                  <li className="flex py-2 items-center">
                    <BiCartAlt size={24} className="mr-4" />
                    My Cart
                  </li>
                </Link>
              )}
              {id && (
                <Link to="/order-list">
                  <li className="flex py-2 items-center">
                    <HiOutlineDocumentDuplicate size={24} className="mr-4" />
                    Order
                  </li>
                </Link>
              )}
              {id ? (
                <li
                  className="flex py-2 items-center cursor-pointer"
                  onClick={logoutClick}
                >
                  <BiLogOut size={24} className="mr-4" />
                  Sign Out
                </li>
              ) : (
                <Link to="/sign-in">
                  <li className="flex py-2 items-center cursor-pointer">
                    <BiLogIn size={24} className="mr-4" />
                    Sign In
                  </li>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <div className="text-xl font-bold">{navTitle}</div>
      <div>
        {id ? (
          <Avatar
            src={profile_img && `http://localhost:8000/${profile_img}`}
            name={name}
            className="bg-slate-300 cursor-pointer text-xs"
            borderRadius="50%"
            w="35px"
            h="35px"
            onClick={() => navigate("/profile-setting")}
          />
        ) : (
          <button
            className="rounded-full bg-[#82CD47] w-14 text-white text-sm font-[600] py-1"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
