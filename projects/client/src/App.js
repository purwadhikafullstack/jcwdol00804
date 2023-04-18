import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import PersonalData from "./Pages/PersonalData";
import ProfileSetting from "./Pages/ProfileSetting";
import ChangePassword from "./Pages/ChangePassword";
import MyAddress from "./Pages/MyAddress";
import AddAddress from "./Pages/AddAddress";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import NotFound from "./Pages/NotFound";
import Axios from "axios";
import { API_URL } from "./helper";
import { loginAction } from "./Actions/user";
import MyCart from "./Pages/MyCart";
import { getCartList } from "./Actions/cart";
import RestrictedRoutes from "./Utils/RestrictedRoutes";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Payment from "./Pages/Payment";
import OrderList from "./Pages/OrderList";
import OrderDetail from "./Pages/OrderDetail";

function App() {
  const dispatch = useDispatch();
  const keepLogin = () => {
    let getLocalStorage = localStorage.getItem("xmart_login");
    if (getLocalStorage) {
      Axios.get(`${API_URL}/user/keep-login`, {
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
        },
      })
        .then((res) => {
          localStorage.setItem("xmart_login", res.data.token);
          dispatch(loginAction(res.data));
          dispatch(getCartList());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route element={<RestrictedRoutes />}>
          <Route path="/personal-data" element={<PersonalData />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/my-address" element={<MyAddress />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-detail/:id" element={<OrderDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
