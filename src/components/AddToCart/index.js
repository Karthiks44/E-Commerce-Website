import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../../store/reducers/cart";

import "./index.css";

function AddToCart({ product }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    // addToCart(product)
    dispatch(addToCart(product));
  }, [product, dispatch]);

  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart(product));
  }, [dispatch, product]);

  if (cart[product.id]) {
    return (
      <div className="add-to-cart">
        <div onClick={handleRemoveFromCart} className="add">
          -
        </div>
        <div>{cart[product.id].quantity}</div>
        <div onClick={handleAddToCart} className="add">
          +
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={handleAddToCart} className="add">
        Add to Cart
      </div>
    );
  }
}

export default AddToCart;
