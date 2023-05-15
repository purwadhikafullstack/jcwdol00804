import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../../helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormSection = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email("Invalid email format")
    }),
    onSubmit: async (values) => {
      try {
        setisSubmitting(true);
        const result = await axios.post(`${API_URL}/user/forgot-password`, values);
        setisSubmitting(false);
        alert(result.data.message);
        navigate("/sign-in");
        formik.resetForm();
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-[#82CD47] font-[600] text-2xl">
        Forgot Password
      </div>
      <div className="w-full mt-5">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="w-9/12">
            <label htmlFor="email" className="text-[20px] opacity-50">
              Enter your email
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] my-2"
              id="email"
              name="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="youremail@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-xs">{formik.errors.email}</div>
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
