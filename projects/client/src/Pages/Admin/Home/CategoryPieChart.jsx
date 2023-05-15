import React, { useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CategoryPieChart = ({ categoryData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E087E8"];

  const countCategory = useCallback(() => {
    let res = 0;
    for (let val of categoryData) {
      res += Number(val.total_product);
    }
    return res;
  }, [categoryData]);

  const CategoryCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      let percent = ((payload[0].value / countCategory()) * 100).toFixed(0);
      return (
        <div className="bg-gray-50 rounded-lg px-2 py-1 shadow-md border">
          <p className="font-bold text-gray-800">{`${payload[0].name} (${percent}%)`}</p>
          <p>{`Total product : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[80%] border shadow-md mt-5 mb-5 px-5 py-3  rounded-lg">
      <div className="text-xl font-bold text-gray-600">Product Type</div>
      {categoryData.length ? (
        <div className="relative">
          <PieChart width={550} height={350}>
            <Pie
              data={categoryData}
              cx="30%"
              cy="50%"
              fill="#8884d8"
              dataKey="total_product"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ fontSize: "14px" }}
              content={<CategoryCustomTooltip />}
            />
            <Legend wrapperStyle={{ fontSize: "16px", fontWeight: "bold" }} />
          </PieChart>
          <table className="absolute top-14 right-[5%] table-auto text-sm w-[45%] shadow-sm border">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="px-1 py-1 text-left border-r">Category</th>
                <th className="px-1 py-1 text-center">Total Product</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categoryData.map((val, idx) => (
                <tr key={idx} className="hover:bg-gray-50 duration-100">
                  <td
                    className="px-1 py-1 text-left border-r font-bold"
                    style={{ color: COLORS[idx] }}
                  >
                    {val.name}
                  </td>
                  <td className="text-center px-1 py-1">{val.total_product}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-gray-100">
              <tr>
                <th className="px-1 py-1 text-left border-r font-bold">
                  Total
                </th>
                <th>{countCategory()}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="text-center text-red-500 mt-10 mb-10">
          No Product In This Branch Store
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
