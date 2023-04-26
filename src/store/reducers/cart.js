const ACTION_PREFIX = "CART/";
// These are my actions
const ADD_TO_CART = ACTION_PREFIX + "x";
const REMOVE_FROM_CART = ACTION_PREFIX + "REMOVE_FROM_CART";

const initialState = {};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product
});

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // 1. I have that product in my cart
      const newCart = { ...state };
      if (newCart[action.payload.id]) {
        const newProduct = { ...newCart[action.payload.id] };
        newProduct.quantity += 1;
        newCart[action.payload.id] = newProduct;
      } else {
        // 2. dont have that product in my cart
        const newProduct = {
          ...action.payload,
          quantity: 1
        };
        newCart[newProduct.id] = newProduct;
      }
      return newCart;
    }
    case REMOVE_FROM_CART: {
      const newCart = { ...state };

      // guard clauses
      if (!newCart[action.payload.id]) return;

      if (newCart[action.payload.id].quantity === 1) {
        delete newCart[action.payload.id];
      } else {
        const newProduct = { ...newCart[action.payload.id] };
        newProduct.quantity -= 1;
        newCart[action.payload.id] = newProduct;
      }
      return newCart;
    }
    default:
      return state;
  }
}
