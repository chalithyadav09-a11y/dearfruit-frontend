import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import LogoutPage from "../Authentication/LogoutPage";
import ProtectedRoute from "./ProtectedRoute";
// import SignIn from "@mui/material";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route path="/product/:id" element={<SingleProduct />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      {/* <Route path="/login" element={<SignIn />}></Route> */}
      <Route path="/login" element={<LoginPage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/myorders" element={<MyOrderPage />}></Route>
        <Route path="/logout" element={<LogoutPage />}></Route>
      </Route>
    </Routes>
  );
};

export default Routing;
