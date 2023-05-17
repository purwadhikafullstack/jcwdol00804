import React, { useEffect, useRef, useState } from "react";
import PageAdmin from "../../../Components/PageAdmin";
import { FcShop } from "react-icons/fc";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { DateRange } from "react-date-range";
import { subDays, format } from "date-fns";
import { MdDateRange } from "react-icons/md";
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../../helper";
import Pagination from "../../../Components/Pagination";
const pageSize = 10;

const StockMovementReport = () => {
  const token = localStorage.getItem("xmart_login");
  const [productList, setProductList] = useState([]);
  const [stockDetail, setStockDetail] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countResult, setCountResult] = useState(0);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);
  const [openId, setOpenId] = useState(0);
  const [openDetail, setOpenDetail] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 30),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const { branch_name } = useSelector((state) => {
    return {
      branch_name: state.userReducer.branch_name,
    };
  });
  const searchRef = useRef("");

  useEffect(() => {
    setOpenDetail(productList.map(() => false));
  }, [productList]);

  const handleStockDetail = (id) => {
    axios
      .get(
        `${API_URL}/report/get-stock-movement-detail?product_id=${id}&start_date=${format(
          dateRange[0].startDate,
          "yyyy-MM-dd"
        )}&end_date=${format(
          dateRange[0].endDate,
          "yyyy-MM-dd"
        )}&sort_date_asc=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setStockDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
        setStockDetail([]);
      });
  };

  useEffect(() => {
    openId &&
      axios
        .get(
          `${API_URL}/report/get-stock-movement-detail?product_id=${openId}&start_date=${format(
            dateRange[0].startDate,
            "yyyy-MM-dd"
          )}&end_date=${format(
            dateRange[0].endDate,
            "yyyy-MM-dd"
          )}&sort_date_asc=${sortByDateAsc}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setStockDetail(res.data);
        })
        .catch((err) => {
          console.log(err);
          setStockDetail([]);
        });
  }, [sortByDateAsc, dateRange, openId, token]);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/report/get-stock-movement-report?search=${search}&start_date=${format(
          dateRange[0].startDate,
          "yyyy-MM-dd"
        )}&end_date=${format(
          dateRange[0].endDate,
          "yyyy-MM-dd"
        )}&limit=${pageSize}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProductList(res.data.result);
        setCountResult(res.data.allResultLength);
      })
      .catch((err) => {
        console.log(err);
        setProductList([]);
        setCountResult(0);
      });
  }, [search, dateRange, currentPage, token]);

  return (
    <PageAdmin>
      {/* If no product found */}
      {!productList.length && (
        <div className="absolute top-[40%] left-[55%] text-red-500">
          Product not found
        </div>
      )}
      <div>
        <div>
          <h3 className="text-gray-800 text-xl font-bold">
            <FcShop className="inline mb-1" size={25} /> {branch_name} Stock
            Movement Report
          </h3>
        </div>
        <div className="flex flex-row items-center justify-between mt-2">
          <div className="relative w-[40%] mr-3">
            <IoSearchOutline
              size={20}
              className="absolute top-[8px] left-2 text-slate-400"
            />
            <RxCross2
              size={20}
              className="absolute top-[9px] right-2 text-slate-400 cursor-pointer"
              onClick={() => {
                setSearch("");
                searchRef.current.value = "";
              }}
            />
            <input
              type="text"
              ref={searchRef}
              onChange={(e) => setSearch(e.target.value)}
              className="border w-full h-9 rounded-lg px-8 focus:border-emerald-500 focus:outline-none "
              placeholder="Search Product Name"
            />
          </div>
          <div className="flex flex-col w-[24%]">
            <div
              className="border rounded-lg pl-2 py-1 text-center "
              onClick={() => setOpenDate(!openDate)}
            >
              {format(dateRange[0].startDate, " d MMM yyyy ")} -{" "}
              {format(dateRange[0].endDate, " d MMM yyyy ")}{" "}
              <MdDateRange className="inline mb-1 ml-1" />
              {openDate ? (
                <RiArrowDropUpLine size={28} className="inline" />
              ) : (
                <RiArrowDropDownLine size={28} className="inline" />
              )}
            </div>
            <div className="relative flex justify-center">
              {openDate && (
                <DateRange
                  onChange={(item) => setDateRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  months={2}
                  direction="horizontal"
                  className="absolute right-0 border shadow-md rounded-lg"
                  maxDate={new Date()}
                />
              )}
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="mt-3 shadow-sm border rounded-lg overflow-visible">
          <table className="w-full table-auto text-sm text-left ">
            <thead className="bg-gray-100 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6 text-center">Initial Stock</th>
                <th className="py-3 px-6 text-center">Stock Movement</th>
                <th className="py-3 px-6 text-center">Latest Stock</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {productList.map((item, idx) => (
                <>
                  <tr key={idx} className="hover:bg-indigo-50 duration-100">
                    <td className="flex items-center py-3 px-5">
                      {openDetail[idx] ? (
                        <AiOutlineMinusSquare
                          size={20}
                          className="mr-3 cursor-pointer"
                          onClick={() => {
                            setOpenDetail(
                              openDetail.map(
                                (val2, idx2) => idx2 === idx && !val2
                              )
                            );
                          }}
                        />
                      ) : (
                        <AiOutlinePlusSquare
                          size={20}
                          className="mr-3 cursor-pointer"
                          onClick={() => {
                            setOpenDetail(
                              openDetail.map(
                                (val2, idx2) => idx2 === idx && !val2
                              )
                            );
                            setSortByDateAsc(true);
                            setOpenId(item.id);
                            handleStockDetail(item.id);
                          }}
                        />
                      )}
                      <div className="text-gray-700 text-sm font-medium product-name">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.initial_stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`${
                          item.total_quantity_change < 0
                            ? "bg-red-100"
                            : "bg-emerald-100"
                        } px-2 py-2 rounded-lg`}
                      >
                        {item.total_quantity_change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.latest_stock}
                    </td>
                  </tr>
                  {openDetail[idx] ? (
                    <>
                      <table className="table-auto w-full ml-12 text-sm text-left border">
                        <thead className="bg-gray-100 text-gray-600 font-medium ">
                          <tr className="w-full">
                            <th
                              className="px-6 py-2 flex flex-row justify-between cursor-pointer"
                              onClick={() => {
                                setSortByDateAsc(!sortByDateAsc);
                              }}
                            >
                              <span>Date</span>
                              <span className="relative">
                                <AiFillCaretUp
                                  className={`absolute top-0 ${
                                    sortByDateAsc && "text-indigo-500"
                                  }`}
                                  size={12}
                                />
                                <AiFillCaretDown
                                  className={`absolute bottom-0 ${
                                    !sortByDateAsc && "text-indigo-500"
                                  }`}
                                  size={12}
                                />
                              </span>
                            </th>
                            <th className="px-6 py-2">Type</th>
                            <th className="px-6 py-2">Stock Movement</th>
                            <th className="px-6 py-2">Stock</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                          {stockDetail.map((val2, idx2) => (
                            <tr
                              key={idx2}
                              className="hover:bg-gray-50 duration-100"
                            >
                              <td className="px-6 py-2">
                                {format(
                                  new Date(val2.created_at),
                                  "d MMM yyyy, HH:mm:ss"
                                )}
                              </td>
                              <td className="px-6 py-2">
                                {val2.type
                                  .split("_")
                                  .map(
                                    (val) =>
                                      val[0].toUpperCase() + val.substring(1)
                                  )
                                  .join(" ")}
                              </td>
                              <td className="px-6 py-2">
                                {val2.quantity_change}
                              </td>
                              <td className="px-6 py-2">
                                {Number(item.initial_stock) +
                                  Number(val2.quantity_change)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex flex-row justify-end mt-5">
        <Pagination
          currentPage={currentPage}
          totalCount={countResult}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </PageAdmin>
  );
};

export default StockMovementReport;
