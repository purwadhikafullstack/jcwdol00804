import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../helper";

const ModalDelete = ({
  setModalDelete,
  modalDelete,
  confirmDeleteItem,
  handleFetchProductList,
}) => {
  const token = localStorage.getItem("xmart_login");
  const { branch_name } = useSelector((state) => {
    return {
      branch_name: state.userReducer.branch_name,
    };
  });
  const handleDelete = () => {
    axios
      .patch(
        `${API_URL}/product/admin/delete-product/${confirmDeleteItem.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleFetchProductList();
      })
      .catch((err) => console.log(err));
    setModalDelete(!modalDelete);
  };
  return (
    <div className="container flex justify-center mx-auto z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ">
        <div className="max-w-sm  p-6 bg-white divide-y divide-gray-500">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl">Delete confirmation</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              cursor="pointer"
              onClick={() => setModalDelete(!modalDelete)}
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
            <p className="text-lg mt-4 font-bold">{branch_name}</p>
            <p className="mb-4 text-sm mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">
                {confirmDeleteItem.name}
              </span>{" "}
              from product list?
            </p>
            <div className="flex flex-row justify-center">
              <div
                className="px-4 py-2 text-sm underline decoration-double cursor-pointer"
                onClick={() => setModalDelete(!modalDelete)}
              >
                Cancel
              </div>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
