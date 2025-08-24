import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BuyNowItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface InitialState {
  product: BuyNowItem | null;
}

const initialState: InitialState = {
  product: JSON.parse(localStorage.getItem("buyNow") || "null"),
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setBuyNow: (state, action: PayloadAction<BuyNowItem>) => {
      // replace old product with new
      state.product = action.payload;
      localStorage.setItem("buyNow", JSON.stringify(action.payload));
    },
    clearBuyNow: (state) => {
      state.product = null;
      localStorage.removeItem("buyNow");
    },
  },
});

export const selectBuyNow = (state: RootState) => state.buyNow.product;

export const { setBuyNow, clearBuyNow } = buyNowSlice.actions;
export default buyNowSlice.reducer;
