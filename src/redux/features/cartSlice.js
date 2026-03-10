import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems");

const initialState = {
  cartItems: savedCart ? JSON.parse(savedCart) : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {

      const item = action.payload;

      const exist = state.cartItems.find(
        (product) => product._id === item._id
      );

      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {

      state.cartItems = state.cartItems.filter(
        (product) => product._id !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }

  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;