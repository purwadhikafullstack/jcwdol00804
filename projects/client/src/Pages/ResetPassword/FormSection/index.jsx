import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../../helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const FormSection = () => {
  const location = useLocation();

  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpen2, setEyeOpen2] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const eyeStyle = {
    close: {
      top: "50%",
      cursor: "pointer",
    },
    open: {
      top: "45%",
      cursor: "pointer",
    },
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .min(8, "Should more than 8 characters")
        .matches(/[a-z]/g, "Should contain at least 1 lower case letter")
        .matches(/[A-Z]/g, "Should contain at least 1 upper case letter")
        .matches(/[0-9]/g, "Should contain at least 1 number"),
      confirmpassword: Yup.string()
        .required("confirm password is a required field")
        .oneOf([Yup.ref("password")], "Password doesn't match"),
    }),
    onSubmit: async (values) => {
      try {
        setisSubmitting(true);
        const token = location.search.split('=')[1];
        const result = await axios.patch(`${API_URL}/user/reset-password`, values, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setisSubmitting(false);
        alert(result.data.message);
        formik.resetForm();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-[#82CD47] font-[600] text-2xl">
        Reset Password
      </div>
      <div className="w-full mt-5">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="w-9/12 relative">
            <label htmlFor="password" className="text-[20px] opacity-50 mt-2">
              New Password
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] my-2"
              id="password"
              name="password"
              type={eyeOpen ? "text" : "password"}
              {...formik.getFieldProps("password")}
              placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
            />
            {eyeOpen ? (
              <AiOutlineEye
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={formik.errors.password ? eyeStyle.open : eyeStyle.close}
                onClick={() => setEyeOpen(!eyeOpen)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={formik.errors.password ? eyeStyle.open : eyeStyle.close}
                onClick={() => setEyeOpen(!eyeOpen)}
              />
            )}
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="w-9/12 relative">
            <label
              htmlFor="confirmpassword"
              className="text-[20px] opacity-50 mt-2"
            >
              Confirm Password
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] my-2"
              id="confirmpassword"
              name="confirmpassword"
              type={eyeOpen2 ? "text" : "password"}
              {...formik.getFieldProps("confirmpassword")}
              placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
            />
            {eyeOpen2 ? (
              <AiOutlineEye
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={
                  formik.errors.confirmpassword ? eyeStyle.open : eyeStyle.close
                }
                onClick={() => setEyeOpen2(!eyeOpen2)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={
                  formik.errors.confirmpassword ? eyeStyle.open : eyeStyle.close
                }
                onClick={() => setEyeOpen2(!eyeOpen2)}
              />
            )}
            {formik.touched.confirmpassword &&
              formik.errors.confirmpassword && (
                <div className="text-red-600 text-xs">
                  {formik.errors.confirmpassword}
                </div>
              )}
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md my-10"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
