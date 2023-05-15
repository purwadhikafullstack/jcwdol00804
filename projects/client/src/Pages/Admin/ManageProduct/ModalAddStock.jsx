import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../helper";

const ModalAddStock = ({
  modalAddStock,
  setModalAddStock,
  addStockItem,
  handleFetchProductList,
}) => {
  const token = localStorage.getItem("xmart_login");
  const [addStock, setAddStock] = useState("");
  const handleAddStock = () => {
    axios
      .patch(
        `${API_URL}/product/admin/add-stock/${addStockItem.id}`,
        { addStock, stock: addStockItem.stock },
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
    setModalAddStock(!modalAddStock);
  };
  return (
    <div className="container flex justify-center mx-auto z-10">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ">
        <div className="max-w-md  p-6 bg-white divide-y divide-gray-500">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl">Add Stock</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              cursor="pointer"
              onClick={() => setModalAddStock(!modalAddStock)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="mt-3 font-bold">{addStockItem.name}</div>
            <div className="flex flex-row">
              <label htmlFor="quantity">Quantity :</label>
              <input
                type="number"
                id="quantity"
                value={addStock}
                onChange={(e) => setAddStock(Number(e.target.value))}
                className="border pl-2 ml-2 rounded-lg"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
              />
            </div>
            <div className="mt-3 font-bold">
              Total After Add Stock : {addStock + addStockItem.stock}
            </div>
            <button
              className="bg-indigo-500 rounded-lg w-[50%] mx-auto text-white mt-5 py-1 font-medium"
              onClick={handleAddStock}
            >
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddStock;
