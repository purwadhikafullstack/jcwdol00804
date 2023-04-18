import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../helper";
import verify from "../../Assets/Verify.png";
import Page from "../../Components/Page";

const Verify = () => {
  const location = useLocation();

  const onClick = async () => {
    try {
      const token = location.search.split("=")[1];
      const result = await axios.patch(`${API_URL}/user/verify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(result.data.message)
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <Page isNavbar={false} isFooter={false}>
      <div className="font-sans grid justify-items-center items-center container mx-auto text-center p-10 min-h-screen">
        <div>
          <div className="object-fit-contain h-1/2 w-1/2 mx-auto">
            <img src={verify} alt="verify-symbol" />
          </div>
          <p className="text-2xl font-bold my-5">
            Please click button below to verify your email
          </p>
        </div>
        <button
          className="font-semibold text-xl py-2 px-8 mt-4 bg-lime-500 text-white rounded-3xl w-full"
          onClick={onClick}
        >
          Verify
        </button>
      </div>
    </Page>
  );
}

export default Verify;
