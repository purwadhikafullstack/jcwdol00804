import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../../../helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const FormSection = () => {

    const [eyeOpen, setEyeOpen] = useState(false);
    const [eyeOpen2, setEyeOpen2] = useState(false);
    const [eyeOpen3, setEyeOpen3] = useState(false);
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
            oldpassword: "",
            password: "",
            confirmpassword: "",
        },
        validationSchema: Yup.object({
            oldpassword: Yup.string()
                .required()
                .min(8, "Should more than 8 characters")
                .matches(/[a-z]/g, "Should contain at least 1 lower case letter")
                .matches(/[A-Z]/g, "Should contain at least 1 upper case letter")
                .matches(/[0-9]/g, "Should contain at least 1 number"),
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
                const token = localStorage.getItem('xmart_login');
                const result = await axios.patch(`${API_URL}/user/change-password`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        <div className="flex flex-col justify-center mx-20 my-10">
            <div className="text-xl font-bold">
                Change Password
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full mt-5">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col"
                    >
                        <div className="w-full/12 relative mb-4">
                            <label htmlFor="oldpassword" className="text-base font-semibold mt-2">
                                Old Password
                            </label>
                            <input
                                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] my-2"
                                id="oldpassword"
                                name="oldpassword"
                                type={eyeOpen ? "text" : "password"}
                                {...formik.getFieldProps("oldpassword")}
                                placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
                            />
                            {eyeOpen ? (
                                <AiOutlineEye
                                    className="absolute right-3"
                                    fontSize={25}
                                    color="gray"
                                    style={formik.errors.oldpassword ? eyeStyle.open : eyeStyle.close}
                                    onClick={() => setEyeOpen(!eyeOpen)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-3"
                                    fontSize={25}
                                    color="gray"
                                    style={formik.errors.oldpassword ? eyeStyle.open : eyeStyle.close}
                                    onClick={() => setEyeOpen(!eyeOpen)}
                                />
                            )}
                            {formik.touched.oldpassword && formik.errors.oldpassword && (
                                <div className="text-red-600 text-xs">
                                    {formik.errors.oldpassword}
                                </div>
                            )}
                        </div>
                        <div className="w-full/12 relative">
                            <label htmlFor="password" className="text-base font-semibold mt-2">
                                New Password
                            </label>
                            <input
                                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] my-2"
                                id="password"
                                name="password"
                                type={eyeOpen2 ? "text" : "password"}
                                {...formik.getFieldProps("password")}
                                placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
                            />
                            {eyeOpen2 ? (
                                <AiOutlineEye
                                    className="absolute right-3"
                                    fontSize={25}
                                    color="gray"
                                    style={formik.errors.password ? eyeStyle.open : eyeStyle.close}
                                    onClick={() => setEyeOpen2(!eyeOpen2)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-3"
                                    fontSize={25}
                                    color="gray"
                                    style={formik.errors.password ? eyeStyle.open : eyeStyle.close}
                                    onClick={() => setEyeOpen2(!eyeOpen2)}
                                />
                            )}
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-600 text-xs">
                                    {formik.errors.password}
                                </div>
                            )}
                        </div>
                        <div className="w-full/12 relative">
                            <label
                                htmlFor="confirmpassword"
                                className="text-base font-semibold mt-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] my-2"
                                id="confirmpassword"
                                name="confirmpassword"
                                type={eyeOpen3 ? "text" : "password"}
                                {...formik.getFieldProps("confirmpassword")}
                                placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
                            />
                            {eyeOpen3 ? (
                                <AiOutlineEye
                                    className="absolute right-3"
                                    fontSize={25}
                                    color="gray"
                                    style={
                                        formik.errors.confirmpassword ? eyeStyle.open : eyeStyle.close
                                    }
                                    onClick={() => setEyeOpen3(!eyeOpen3)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-3"
                                    fontSize={25}
                                    color="gray"
                                    style={
                                        formik.errors.confirmpassword ? eyeStyle.open : eyeStyle.close
                                    }
                                    onClick={() => setEyeOpen3(!eyeOpen3)}
                                />
                            )}
                            {formik.touched.confirmpassword &&
                                formik.errors.confirmpassword && (
                                    <div className="text-red-600 text-xs">
                                        {formik.errors.confirmpassword}
                                    </div>
                                )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md my-10"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormSection;
