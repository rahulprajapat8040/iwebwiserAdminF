import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDrawer: true,
};

const hideShowDrawerSlice = createSlice({
  name: "hideShowDrawer",
  initialState,
  reducers: {
    hideDrawer: (state, action) => {
      state.showDrawer = action.payload;
    },
  },
});

export const { hideDrawer } = hideShowDrawerSlice.actions;
export default hideShowDrawerSlice.reducer;
