import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../../../helper";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../Actions/user";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormSection = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email("Invalid email format"),
      password: Yup.string()
        .required()
        .min(8, "Should more than 8 characters")
        .matches(/[a-z]/g, "Should contain at least 1 lower case letter")
        .matches(/[A-Z]/g, "Should contain at least 1 upper case letter")
        .matches(/[0-9]/g, "Should contain at least 1 number"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${API_URL}/user/sign-in`, values);
        dispatch(loginAction(result.data));
        localStorage.setItem("xmart_login", result.data.token);
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-[#82CD47] font-[600] text-2xl">Sign In</div>
      <div className="w-full mt-2">
        <form
          className="flex flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-9/12">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="text-[20px] opacity-50 place-self-start"
              >
                Email
              </label>

              <input
                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] "
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-xs">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label
                htmlFor="password"
                className="text-[20px] opacity-50 place-self-start"
              >
                Password
              </label>
              <input
                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] "
                id="password"
                name="password"
                type={eyeOpen ? "text" : "password"}
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
              {eyeOpen ? (
                <AiOutlineEye
                  className="absolute right-3 bottom-1"
                  fontSize={25}
                  color="gray"
                  onClick={() => setEyeOpen(!eyeOpen)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 bottom-1"
                  fontSize={25}
                  color="gray"
                  onClick={() => setEyeOpen(!eyeOpen)}
                />
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="self-end mr-14">
            <Link to="/forgot-password">
              <span className="text-xs text-lime-500 ">Forgot Password?</span>
            </Link>
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/sign-up">
            <span className="text-[#689C36]">Sign up</span>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default FormSection;
