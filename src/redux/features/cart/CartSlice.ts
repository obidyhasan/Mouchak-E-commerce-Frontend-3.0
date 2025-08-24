import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface InitialState {
  carts: CartItem[];
}

const initialState: InitialState = {
  carts: JSON.parse(localStorage.getItem("carts") || "[]"), // load from localStorage
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // update qty
      } else {
        state.carts.push(action.payload);
      }

      localStorage.setItem("carts", JSON.stringify(state.carts)); // persist
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const product = state.carts.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },

    deleteCart: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    clearCart: (state) => {
      state.carts = [];
      localStorage.removeItem("carts");
    },
  },
});

export const selectCarts = (state: RootState) => state.cart.carts;

export const { addCart, updateQuantity, deleteCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
