import React, { memo, useContext, useState } from "react";
import "./SingleProduct.css";
import QuantityInput from "./QuantityInput";
import { useParams, useSearchParams } from "react-router-dom";
import useData from "../../hooks/useData";
import CartContext from "../../contexts/cartContext";
import UserContext from "../../contexts/userContext";

const SingleProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const { id } = useParams();

  const {
    data: product,
    error,
    isLoading,
  } = useData(`/products/${id}`, null, ["products", id]);

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <h1>Is Loaidng.....</h1>}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {/* <img src={dataUri} alt="" /> */}
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className={selectedImage === index ? "selected_image" : ""}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_discription">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            {user && (
              <>
                <h2 className="qantity_title">Quantity: </h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>
                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default memo(SingleProduct);
