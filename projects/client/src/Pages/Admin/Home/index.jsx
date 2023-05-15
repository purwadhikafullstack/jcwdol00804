import React, { useEffect, useState } from "react";
import PageAdmin from "../../../Components/PageAdmin";
import { FcShop } from "react-icons/fc";
import { GiQueenCrown } from "react-icons/gi";
import { useSelector } from "react-redux";
import CategoryPieChart from "./CategoryPieChart";
import axios from "axios";
import { API_URL } from "../../../helper";
import SalesPieChart from "./SalesPieChart";

const AdminHome = () => {
  const { role_id, branch_name, branch_id } = useSelector((state) => {
    return {
      role_id: state.userReducer.role_id,
      branch_name: state.userReducer.branch_name,
      branch_id: state.userReducer.branch_id,
    };
  });
  const token = localStorage.getItem("xmart_login");
  const [categoryData, setCategoryData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [salesDataType, setSalesDataType] = useState("monthly");
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
      setBranchList(res.data);
    });
  }, []);

  useEffect(() => {
    if (role_id === 2) {
      axios
        .get(
          `${API_URL}/report/get-category-data-branch?branch_id=${branch_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setCategoryData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setCategoryData([]);
        });
      axios
        .get(
          `${API_URL}/report/get-sales-data-branch?branch_id=${branch_id}&type=${salesDataType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSalesData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setSalesData([]);
        });
    } else if (role_id === 3) {
      axios
        .get(
          `${API_URL}/report/get-category-data-branch?branch_id=${selectedBranchId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setCategoryData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setCategoryData([]);
        });
      axios
        .get(
          `${API_URL}/report/get-sales-data-branch?branch_id=${selectedBranchId}&type=${salesDataType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSalesData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setSalesData([]);
        });
    }
  }, [selectedBranchId, branch_id, token, role_id, salesDataType]);

  return (
    <PageAdmin>
      <div>
        <div className="text-gray-800 text-xl font-bold">
          {role_id === 2 ? (
            <>
              <FcShop className="inline mb-1 mr-1" size={25} />
              {branch_name}
            </>
          ) : (
            <>
              <GiQueenCrown className="inline mb-1 mr-1" size={25} />
              Xmart Super Admin
            </>
          )}
        </div>
        {role_id === 3 && (
          <div className="flex flex-row items-center mt-3">
            <FcShop size={20} className="inline" />
            <select
              className="bg-blue-100 font-semibold rounded-lg px-3 ml-1 py-1"
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
            >
              {branchList.map((val, idx) => {
                return (
                  <option key={idx} value={val.id}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <CategoryPieChart categoryData={categoryData} />
        <SalesPieChart
          salesData={salesData}
          salesDataType={salesDataType}
          setSalesDataType={setSalesDataType}
        />
      </div>
    </PageAdmin>
  );
};

export default AdminHome;
