import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import config from "../../config.json";
import UserContext from "../../contexts/userContext";
import CartContext from "../../contexts/cartContext";
import remove from "../../assets/remove.png";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, checkoutCart } =
    useContext(CartContext);
  console.log("carttt-->", cart);

  const subTotal = useMemo(() => {
    let total = 0;

    cart?.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);

  // const checkout = () => {
  //   const oldCart = [...cart];
  //   setCart([]);
  //   checkoutAPI()
  //     .then(() => {
  //       toast.success("Order placed successfully");
  //     })
  //     .catch((err) => {
  //       toast.error("Somthing went wrong!");
  //       setCart(oldCart);
  //     });
  // };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>
      {/* Cart Table */}
      <Table headings={["Item", "Peice", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart?.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Chanrge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Final total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="search_button checkout_buttton"
        onClick={() => {
          checkoutCart(cart);
        }}
      >
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
