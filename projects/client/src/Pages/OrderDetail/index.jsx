import React, { useEffect, useState } from "react";
import Page from "../../Components/Page";
import BackButton from "../../Components/BackButton";
import { FcShop } from "react-icons/fc";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../helper";
import { format } from "date-fns";

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [productInfo, setProductInfo] = useState([]);

  const { id } = useParams();
  const getTotalPrice = (arr) => {
    return arr.map((val) => val.price * val.quantity).reduce((p, c) => p + c);
  };

  useEffect(() => {
    const token = localStorage.getItem("xmart_login");
    let promise1 = axios.get(`${API_URL}/order/get-order-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let promise2 = axios.get(`${API_URL}/order/get-product-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Promise.all([promise1, promise2])
      .then((res) => {
        setOrderDetail(res[0].data[0]);
        setProductInfo(res[1].data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Page isFooter={false} isNavbar={false}>
      <div className="relative">
        <BackButton />
        <div className="text-center text-xl py-5 font-bold z-10 relative">
          Order Detail
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="flex flex-col px-5 mt-2">
          {/* Status */}
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-8">
            <div className="font-bold px-5 text-lg">
              {orderDetail.status && orderDetail.status}
            </div>
            <div className="h-[1px] bg-slate-200 w-[95%] mt-2 ml-3"></div>
            <div className="text-sm font-bold text-slate-400 px-5 mt-2">
              {orderDetail.invoice_no && orderDetail.invoice_no}
            </div>
            <div className="text-sm font-bold text-slate-400 px-5 mt-1">
              Purchased Date :{" "}
              {orderDetail.created_at &&
                format(
                  new Date(orderDetail.created_at),
                  "d MMM yyyy, HH:mm (O)"
                )}
            </div>
          </div>
          {/* Product Detail & Delivery Info */}
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-8">
            <div className="flex flex-row justify-between items-center ">
              <div className="font-bold px-5">Product Details</div>
              <span className="px-5 font-bold text-slate-400">
                <FcShop className="mb-1 mr-1 inline" />
                {productInfo.length && productInfo[0].branch_name}
              </span>
            </div>
            <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
            {productInfo.length &&
              productInfo.map((val, idx) => {
                return (
                  <div className="flex flex-row items-center justify-between px-5">
                    <div className="flex flex-row items-center mt-1 ">
                      <img
                        src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                        alt={val.name}
                        className=" w-12 h-12 mt-2 border text-xs"
                      />
                      <div className="flex flex-col ml-2">
                        <span className="font-bold text-sm w-[210px] mt-3">
                          {val.name}
                        </span>
                        <span className="text-[#6CC51D] font-bold text-sm">
                          {val.quantity} x Rp {val.price.toLocaleString("id")}
                        </span>
                      </div>
                    </div>
                    <div className="font-bold text-[#6CC51D]">
                      Rp {(val.quantity * val.price).toLocaleString("id")}
                    </div>
                  </div>
                );
              })}
            <div className="h-[6px] bg-slate-200 w-[100%] mt-3 mb-2 "></div>
            <div className="flex flex-col">
              <div className="font-bold px-5">Delivery Info</div>
              <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
              <div className="flex flex-row justify-between px-5 mt-1">
                <span>Courier</span>
                <span className="w-[70%]">
                  {orderDetail.courier && orderDetail.courier}
                </span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-1">
                <span>Address</span>
                <div className="w-[70%]">
                  <div>{orderDetail.address && orderDetail.address}</div>
                  <div>
                    {orderDetail.city && orderDetail.city},{" "}
                    {orderDetail.province && orderDetail.province}
                  </div>
                  <div>{orderDetail.zipcode && orderDetail.zipcode}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Shopping Summary */}
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-12 ">
            <div className="flex flex-col">
              <div className="px-5 font-bold">
                {orderDetail.status &&
                orderDetail.status === "Menunggu Pembayaran"
                  ? "Shopping Summary"
                  : "Payment Detail"}
              </div>
              <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Total Price</span>
                <span>
                  Rp{" "}
                  {productInfo.length &&
                    getTotalPrice(productInfo).toLocaleString("id")}
                </span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Total Delivery Cost</span>
                <span>
                  Rp{" "}
                  {orderDetail.shipping_cost &&
                    orderDetail.shipping_cost.toLocaleString("id")}
                </span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Discount Delivery Cost</span>
                <span>-Rp 0</span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Voucher Applied</span>
                <span>-Rp 0</span>
              </div>
              <div className="h-[1px] bg-slate-200 w-[95%] mt-2 ml-3"></div>
            </div>
            <div className="flex flex-row justify-between px-5 mt-2">
              <span className="font-bold">
                {" "}
                {orderDetail.status &&
                orderDetail.status === "Menunggu Pembayaran"
                  ? "Total Shopping"
                  : "Total Payment"}
              </span>
              <span className="font-bold">
                Rp{" "}
                {productInfo.length &&
                  orderDetail.shipping_cost &&
                  (
                    getTotalPrice(productInfo) + orderDetail.shipping_cost
                  ).toLocaleString("id")}
              </span>
            </div>
          </div>
        </div>
        {orderDetail.status && orderDetail.status === "Menunggu Pembayaran" ? (
          <div className="self-center mb-16">
            <button className="mr-2 py-[2px] px-4 bg-red-500 rounded-full text-lg font-semibold shadow-md text-white">
              Cancel Order
            </button>
            <button className="px-4 py-[2px]  bg-[#82cd47] rounded-full text-lg font-semibold  shadow-md text-white">
              Proceed To Payment
            </button>
          </div>
        ) : null}
      </div>
    </Page>
  );
};

export default OrderDetail;
