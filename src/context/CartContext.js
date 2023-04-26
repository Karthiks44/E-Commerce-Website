import { createContext, useCallback, useContext, useState } from "react";

const CartContext = createContext();

/**
 *
 * {
 * "12" : {
 *    quantity: 3,
 *    title: "SanDisk",
 *    price: 12,
 *    image: ""
 *  }
 * }
 */

/**
  * 
  * const obj1 = {name: "Sunny"}
  // * const obj2 = obj1;
  const obj2 = { ...obj1 };
  * obj1.name = "Sourabh";
  * console.log(obj2.name);
  * 
  */

function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = useCallback(
    (product) => {
      // 1. I have that product in my cart
      const newCart = { ...cart };
      if (newCart[product.id]) {
        const newProduct = { ...newCart[product.id] };
        newProduct.quantity += 1;
        newCart[product.id] = newProduct;
      } else {
        // 2. dont have that product in my cart
        const newProduct = {
          ...product,
          quantity: 1
        };
        newCart[newProduct.id] = newProduct;
      }
      setCart(newCart);
    },
    [setCart, cart]
  );

  const removeItem = useCallback(
    (product) => {
      const newCart = { ...cart };

      // guard clauses
      if (!newCart[product.id]) return;

      if (newCart[product.id].quantity === 1) {
        delete newCart[product.id];
      } else {
        const newProduct = { ...newCart[product.id] };
        newProduct.quantity -= 1;
        newCart[product.id] = newProduct;
      }
      setCart(newCart);
    },
    [cart, setCart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => useContext(CartContext);

export { useCartContext };

export default CartProvider;
