import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/userContext";
import CartContext from "./contexts/cartContext";

import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Routing from "./Component/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthtoken";
import "react-toastify/dist/ReactToastify.css";
import useData from "./hooks/useData";
import cartReducer from "./reducer/cartReducer";
import useAddToCart from "./hooks/cart/useAddtoCart";
import useRemoveFromCart from "./hooks/cart/useRemoveFromCart";
import useUpdateCart from "./hooks/cart/useUpdateCart";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispachCart] = useReducer(cartReducer, []);

  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCart();

  useEffect(() => {
    if (cartData) {
      dispachCart({ type: "GET_CART", payload: { products: cartData } });
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser?.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      dispachCart({ type: "ADD_TO_CART", payload: { product, quantity } });
      addToCartMutation.mutate(
        { id: product._id, quantity },
        {
          onError: (error) => {
            console.log(error);
            toast.error("Somthing went Wrong!");
            dispachCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id) => {
      dispachCart({ type: "REMOVE_FROM_CART", payload: { id } });
      removeFromCartMutation.mutate(
        { id },
        {
          onError: () => {
            toast.error("Somthing went Wrong!");
            dispachCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );

      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
      }
      dispachCart({ type: "GET_CART", payload: { products: updatedCart } });

        updateCartMutation.mutate({id, type}, {
          onError: () => {
            toast.error("Somthing went wrong!");
            dispachCart({ type: "REVERT_CART", payload: { cart } });
          }
        })
    },
    [cart]
  );

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
