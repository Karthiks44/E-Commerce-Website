import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

/**
 * cart: 
9: {
    id: 9
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 "
    price: 64
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system"
    category: "electronics"
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
    rating: Object
    quantity: 1
}
 */
export default function CartPage() {
  const cart = useSelector((state) => state.cart);

  const cartItems = useMemo(() => {
    let totalItems = 0;
    if (Object.keys(cart).length > 0) {
      Object.keys(cart).forEach((productId) => {
        totalItems += cart[productId].quantity;
      });
    }
    return totalItems;
  }, [cart]);

  const cartTotal = useMemo(() => {
    let total = 0;
    if (Object.keys(cart).length > 0) {
      Object.keys(cart).forEach((productId) => {
        total += cart[productId].price * cart[productId].quantity;
      });
    }
    return total;
  }, [cart]);

  if (cartItems === 0) {
    return (
      <div>
        Hey your cart is empty, please add some products!
        <Link to="/products/electronics">Go to products</Link>
      </div>
    );
  } else {
    return (
      <div className="cart-items-container">
        {Object.keys(cart).map((productId) => (
          <CartProduct key={productId} product={cart[productId]} />
        ))}
        <div className="cart-total">
          Total for this cart would be ${cartTotal}
        </div>
      </div>
    );
  }
}
