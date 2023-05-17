import React, { useState } from "react";
import BackButton from "../../Components/BackButton";
import Page from "../../Components/Page";
import { Avatar } from "@chakra-ui/avatar";
import { BiImageAdd, BiMaleFemale } from "react-icons/bi";
import { BsFillPersonBadgeFill, BsCheck2All } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../../helper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Actions/user";
import { format, subYears } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

const PersonalData = () => {
  const dispatch = useDispatch();
  const [isEditting, setIsEditting] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { name, email, birthdate, gender, profile_img } = useSelector(
    (state) => {
      return {
        name: state.userReducer.name,
        email: state.userReducer.email,
        birthdate: state.userReducer.birthdate,
        gender: state.userReducer.gender,
        profile_img: state.userReducer.profile_img,
      };
    }
  );

  const formik = useFormik({
    initialValues: {
      name,
      email,
      birthdate,
      gender: gender === null && "",
      images: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .test("Unique Email", "Email already in use", (value) => {
          if (value !== email) {
            return new Promise((resolve, reject) => {
              axios
                .get(`${API_URL}/user/unique-email/${value}`)
                .then((res) => {
                  resolve(true);
                })
                .catch((error) => {
                  if (
                    error.response.data.message ===
                    "Email already in use. please use another email"
                  ) {
                    resolve(false);
                  }
                });
            });
          }
          return true;
        })
        .email("Invalid email format"),
      birthdate: Yup.date().max(new Date()).nullable(),
      gender: Yup.mixed().oneOf(["male", "female"]).nullable(),
      images: Yup.mixed()
        .test("fileSize", "File size is too large. Max size 1MB", (value) =>
          value ? value.size <= 1048576 : true
        )
        .test("fileType", "Unsupported file type", (value) =>
          value
            ? ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
                value.type
              )
            : true
        )
        .nullable(),
    }),
    onSubmit: async (values) => {
      try {
        let token = localStorage.getItem("xmart_login");
        const result = await axios.patch(
          `${API_URL}/user/update-profile`,
          {
            name: values.name,
            email: values.email,
            birthdate: values.birthdate,
            gender: values.gender,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (values.images) {
          const formData = new FormData();
          formData.append("images", values.images);
          await axios.patch(`${API_URL}/user/upload-profile-img`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        toast.success(result.data.message);
        setIsModal(!isModal);
        setIsEditting(!isEditting);
        let resultImg = await axios.get(`${API_URL}/user/get-user-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(
          updateProfile({
            name: values.name,
            email: values.email,
            birthdate: values.birthdate,
            gender: values.gender,
            profile_img: resultImg.data.profile_img,
            is_verfied: values.is_verfied,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleEditting = () => {
    setIsEditting(!isEditting);
    formik.setFieldValue("name", name);
    formik.setFieldValue("email", email);
    formik.setFieldValue(
      "birthdate",
      format(new Date(birthdate), "yyyy-MM-dd")
    );
    formik.setFieldValue("gender", gender);
  };

  return (
    <Page isFooter={false} isNavbar={false}>
      <Toaster />
      <div className="relative">
        <div className="rounded-full bg-gradient-to-b from-[#ffffff] to-[#C4F594] w-[700px] h-[700px] absolute -top-[700%] -left-[23%]"></div>
        <BackButton />
        <div className="text-center text-xl py-5 font-bold z-10 relative">
          Personal Data
        </div>
      </div>
      {/* Form Section */}
      <div className="flex flex-col items-center">
        <div className="text-center text-xl mt-8 relative">{name}</div>
        {isEditting ? (
          // Untuk preview
          <Avatar
            src={
              profile_img
                ? !formik.errors.images && formik.values.images
                  ? URL.createObjectURL(formik.values.images)
                  : `http://localhost:8000/${profile_img}`
                : !formik.errors.images && formik.values.images
                ? URL.createObjectURL(formik.values.images)
                : ""
            }
            borderRadius="50%"
            w="100px"
            h="100px"
            className="bg-slate-300 absolute top-[30px]"
          />
        ) : (
          // Untuk hasil
          <Avatar
            src={profile_img && `http://localhost:8000/${profile_img}`}
            borderRadius="50%"
            w="100px"
            h="100px"
            className="bg-slate-300 absolute top-[30px]"
          />
        )}
        <form
          className="flex flex-col items-center mt-12 w-[50%]"
          onSubmit={formik.handleSubmit}
        >
          {isEditting && (
            <div>
              <label
                htmlFor="file"
                className="rounded-full bg-[#82CD47] text-white px-5 py-1 inline-block"
              >
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  className="overflow-hidden absolute opacity-0"
                  onChange={(e) => {
                    formik.setFieldValue("images", e.target.files[0]);
                  }}
                />
                <BiImageAdd className="inline mr-1 " size={20} />
                Choose a file
              </label>
            </div>
          )}
          {isEditting && formik.errors.images && (
            <div className="text-red-600 text-xs">{formik.errors.images}</div>
          )}
          <div className=" mt-5 flex flex-row justify-between w-[150%]">
            <label htmlFor="name">
              <BsFillPersonBadgeFill className="inline mr-1 mb-1" size={20} />
              Name
            </label>
            {isEditting ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="rounded-md px-[7px]"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600 text-xs">
                    {formik.errors.name}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-[7px] w-[51%]">{name}</div>
            )}
          </div>
          <div className="h-[2px] bg-slate-200 w-[300%] mt-4 "></div>
          <div className=" mt-5 flex flex-row justify-between w-[150%]">
            <label htmlFor="email">
              <MdEmail className="inline mr-1 mb-1" size={20} />
              Email
            </label>
            {isEditting ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="rounded-md px-[7px]"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-xs ">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-[7px] w-[51%] truncate">{email}</div>
            )}
          </div>
          <div className="h-[2px] bg-slate-200 w-[300%] mt-4 "></div>
          <div className=" mt-5 flex flex-row justify-between w-[150%] flex-wrap">
            <label htmlFor="birthdate">
              <FaBirthdayCake className="inline mr-1 mb-1" size={20} />
              Birthdate
            </label>
            {isEditting ? (
              <div className="flex flex-col mr-[19%] ">
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  max={format(subYears(new Date(), 17), "yyyy-MM-dd")}
                  className="rounded-md px-[7px]"
                  {...formik.getFieldProps("birthdate")}
                />
                {formik.touched.birthdate && formik.errors.birthdate && (
                  <div className="text-red-600 text-xs">
                    {formik.errors.birthdate}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-[7px] w-[51%]">
                {birthdate
                  ? format(new Date(birthdate), "dd/MM/yyyy")
                  : "Not Yet Recorded"}
              </div>
            )}
          </div>
          <div className="h-[2px] bg-slate-200 w-[300%] mt-4 "></div>
          <div className=" mt-5 flex flex-row justify-between w-[150%]">
            <label htmlFor="gender">
              <BiMaleFemale className="inline mr-1 mb-1" size={20} />
              Gender
            </label>
            {isEditting ? (
              <div className="flex flex-col mr-[20%]">
                <select
                  id="gender"
                  name="gender"
                  className="px-[7px]"
                  {...formik.getFieldProps("gender")}
                >
                  <option value="" hidden>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-600 text-xs">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-[7px] w-[51%]">
                {gender
                  ? gender.substring(0, 1).toUpperCase() + gender.substring(1)
                  : "Not Yet Selected"}
              </div>
            )}
          </div>
          <div className="h-[2px] bg-slate-200 w-[300%] mt-4"></div>
          {/* Modal Section */}
          {isModal ? (
            <div className="container flex justify-center mx-auto">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl">Profile Changes</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      cursor="pointer"
                      onClick={() => setIsModal(!isModal)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-4">
                    <p className="mb-4 text-sm mt-4">
                      Are you sure you want to approve this edit on your
                      personal data ?
                    </p>
                    <div className="flex flex-row justify-center">
                      <div
                        className="px-4 py-2 text-sm underline decoration-double cursor-pointer"
                        onClick={() => {
                          setIsModal(!isModal);
                          setIsEditting(!isEditting);
                          formik.setFieldValue("images", null);
                        }}
                      >
                        Discard
                      </div>
                      <button
                        className={
                          formik.errors.images ||
                          formik.errors.name ||
                          formik.errors.email ||
                          formik.errors.birthdate ||
                          formik.errors.gender
                            ? `px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-default`
                            : `px-4 py-2 text-white bg-[#82CD47] rounded`
                        }
                        type="submit"
                      >
                        Confirm Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </form>
        {/* Button Section */}
        {isEditting ? (
          <button
            className="rounded-full bg-cyan-600 w-5/12 h-[38px] text-white mt-10 text-[20px] font-[600] leading-6 shadow-md"
            onClick={() => setIsModal(!isModal)}
          >
            <BsCheck2All className="inline mr-2" />
            Save changes
          </button>
        ) : (
          <button
            className="rounded-full bg-[#82CD47] w-5/12 h-[38px] text-white mt-10 text-[20px] font-[600] leading-6 shadow-md"
            onClick={handleEditting}
          >
            Edit profile
          </button>
        )}
      </div>
    </Page>
  );
};

export default PersonalData;
