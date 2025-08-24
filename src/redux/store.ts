import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "./features/cart/CartSlice";
import loadingReducer from "./features/loadingSlice";
import buyNowReducer from "@/redux/features/buyNow/buyNowSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
    buyNow: buyNowReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
