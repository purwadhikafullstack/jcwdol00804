import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SalesPieChart = ({ salesData, salesDataType, setSalesDataType }) => {
  const SalesCustomTooltip = ({ label, active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-50 rounded-lg px-2 py-1 shadow-md border">
          <p className="font-bold text-gray-800">{`${label}`}</p>
          <p>{`Total sales : Rp ${payload[0].value.toLocaleString("id")}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[80%] border shadow-md mt-5 mb-5 px-5 py-3 rounded-lg">
      <div className="text-xl font-bold text-gray-600">Sales</div>
      <div className="relative">
        {salesData.length ? (
          <LineChart
            width={700}
            height={400}
            data={salesData}
            margin={{
              top: 50,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" fill="blue" fillOpacity="3%" />
            <XAxis dataKey="date" fontSize={14} />
            <YAxis
              dataKey="total_sales"
              width={120}
              tickFormatter={(num) =>
                num ? `Rp ${num.toLocaleString("id")}` : ""
              }
              tickMargin={10}
              fontSize={14}
            />
            <Tooltip
              content={<SalesCustomTooltip />}
              wrapperStyle={{ fontSize: "14px" }}
            />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="total_sales"
              stroke="#3b86f6"
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        ) : (
          <div className="text-center text-red-500 mt-10 mb-10 mr-10">
            No Sales Recorded
          </div>
        )}
        <div className="absolute top-0 right-5">
          <select
            className="border px-2 py-1 rounded-lg shadow-md"
            value={salesDataType}
            onChange={(e) => setSalesDataType(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SalesPieChart;
