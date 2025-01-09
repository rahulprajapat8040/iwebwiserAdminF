import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllServiceDetail = createAsyncThunk(
  "getAllServiceDetail",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllServiceDetail, {
        params: { page, limit, search },
      });
      return {
        serviceDetails: response.data.data.serviceDetails,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllServiceDetailFull = createAsyncThunk(
  "getAllServiceDetailFull",
  async (serviceId) => {
    try {
    //   const response = await axios.get(`${Apis.getByServiceId}/${serviceId}`);
    const response = 'hello'
      return {
        serviceDetails: response,
      };
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }
);

export const getAllServiceDetailSlice = createSlice({
  name: "getAllServiceDetail",
  initialState: {
    serviceDetails: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServiceDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllServiceDetail.fulfilled, (state, action) => {
      state.serviceDetails = action.payload.serviceDetails;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllServiceDetail.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllServiceDetailFullSlice = createSlice({
  name: "getAllServiceDetailFull",
  initialState: {
    serviceDetails: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServiceDetailFull.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllServiceDetailFull.fulfilled, (state, action) => {
      state.serviceDetails = action.payload.serviceDetails;
      state.isLoading = false;
    });
    builder.addCase(getAllServiceDetailFull.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllServiceDetailReducer = getAllServiceDetailSlice.reducer;
export const getAllServiceDetailFullReducer = getAllServiceDetailFullSlice.reducer;
