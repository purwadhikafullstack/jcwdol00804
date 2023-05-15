import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../helper";
import verify from "../../Assets/Verify.png";
import Page from "../../Components/Page";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Actions/user";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const getUserInfo = async () => {
    try {
      const token = location.search.split("=")[1];
      const result = await axios.get(
        `${API_URL}/user/get-user-info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setStatus(result.data.is_verified);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = async () => {
    try {
      const token = location.search.split("=")[1];
      const result = await axios.patch(
        `${API_URL}/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await axios.get(`${API_URL}/user/get-user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        updateProfile({
          is_verified: user.data.is_verified,
        })
      );
      toast.success(result.data.message);
      setIsSubmit(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <Page isNavbar={false} isFooter={false}>
      <div className="flex flex-col items-center text-center mx-auto my-20">
        <Toaster />
        <div className="w-52 h-52">
          <img src={verify} alt="verify-symbol" />
        </div>
        {!isSubmit && status === 0 ? (
          <>
            <p className="text-xl font-bold mx-24 my-10">
              Please click button below to Verify your email
            </p>
            <button
              className="font-semibold text-2xl pb-1 bg-lime-500 text-white rounded-2xl w-40 h-10 hover:opacity-75"
              onClick={() => onClick()}
            >
              Verify
            </button>
          </>
        ) : (
          <>
            <p className="text-xl font-bold mx-24 my-10">
              Email verified
            </p>
            <button
              className="font-semibold text-2xl pb-1 mt-5 bg-lime-500 text-white rounded-2xl w-40 h-10 hover:opacity-75"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </>
        )}
      </div>
    </Page>
  );
};

export default Verify;
