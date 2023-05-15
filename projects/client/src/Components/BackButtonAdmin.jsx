import React from "react";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButtonAdmin = () => {
  const navigate = useNavigate();
  return (
    <button
      className="px-4 py-1 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-600/90"
      onClick={() => navigate(-1)}
    >
      <IoReturnDownBackOutline className="inline mr-1" />
      Back
    </button>
  );
};

export default BackButtonAdmin;
