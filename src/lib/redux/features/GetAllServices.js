import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllServices = createAsyncThunk(
  "getAllServices",
  async ({ page, limit, search, service_id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllServices, {
        params: { page, limit, search, service_id },
      });
      return {
        services: response.data.data.services,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllServicesFull = createAsyncThunk(
  "getAllServicesFull",
  async ({ search, service_id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllServicesFull, {
        params: { search, service_id },
      });
      return {
        services: response.data.data.services,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllServicesSlice = createSlice({
  name: "getAllServices",
  initialState: {
    services: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.services = action.payload.services;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllServices.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllServicesFullSlice = createSlice({
  name: "getAllServicesFull",
  initialState: {
    services: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServicesFull.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllServicesFull.fulfilled, (state, action) => {
      state.services = action.payload.services;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllServicesFull.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllServicesFullReducer = getAllServicesFullSlice.reducer;
export const getAllServicesReducer = getAllServicesSlice.reducer;
