import React, { useEffect, useState } from "react";

import "./MyOrderPage.css";
import Table from "../Common/Table";
import { currentOrderAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import useData from "../../hooks/useData";

const MyOrderPage = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useData("/order", null, ["orders"], 1 * 60 * 1000);
  const getProductsString = (order) => {
    const productStringArray = order.products.map(
      (prd) => `${prd.product.title}(${prd.quantity})`
    );
    return productStringArray.join(", ");
  };
  return (
    <section className="align_center myorder_page">
      {isLoading && <h2>Is Loading....</h2>}
      {error && <em className="form_error">{error}</em>}
      {orders && (
        <Table headings={["Orders", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductsString(order)}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
