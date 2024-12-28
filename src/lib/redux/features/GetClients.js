import { Apis } from "@/utils/Apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllClient = createAsyncThunk(
  "getAllClient",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllClient, {
        params: { page, limit, search },
      });
      return {
        ourClients: response.data.data.ourClients,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllClientSlice = createSlice({
  name: "getAllClient",
  initialState: {
    ourClients: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllClient.fulfilled, (state, action) => {
      state.ourClients = action.payload.ourClients;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllClient.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllClientReducer = getAllClientSlice.reducer;