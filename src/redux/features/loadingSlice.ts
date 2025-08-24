// redux/features/loadingSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loading.loading;
export default loadingSlice.reducer;
