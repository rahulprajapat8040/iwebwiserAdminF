import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllHeader = createAsyncThunk("getAllHeader", async () => {
  try {
    const response = await axios.get(Apis.getAllHeader);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllHeaderSlice = createSlice({
  name: "getAllHeader",
  initialState: {
    headers: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllHeader.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllHeader.fulfilled, (state, action) => {
      state.headers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllHeader.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllHeaderReducer = getAllHeaderSlice.reducer;
