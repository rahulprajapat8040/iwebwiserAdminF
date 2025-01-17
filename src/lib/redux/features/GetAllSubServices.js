import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllSubService = createAsyncThunk(
  "getAllSubService",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllSubService, {
        params: { page, limit, search },
      });
      return {
        subServices: response.data.data.subServices,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubServiceById = createAsyncThunk(
  "getSubServiceById",
  async (serviceId) => {
    try {
      const response = await axios.get(`${Apis.getByServiceId}/${serviceId}`);
      return {
        subServices: response.data.data,
      };
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }
);

export const getAllSubServicesFull = createAsyncThunk(
  "getAllSubServicesFull",
  async () => { 
    try {
      const response = await axios.get(`${Apis.getAllSubServicesFull}`);
      return {
        subServices: response.data.data.subServices,
      };
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }
);

export const getAllSubServicesSlice = createSlice({
  name: "getAllSubService",
  initialState: {
    subServices: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSubService.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubService.fulfilled, (state, action) => {
      state.subServices = action.payload.subServices;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllSubService.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getSubServiceByIdSlice = createSlice({
  name: "getSubServiceById",
  initialState: {
    subServices: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getSubServiceById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSubServiceById.fulfilled, (state, action) => {
      state.subServices = action.payload.subServices;
      state.isLoading = false;
    });
    builder.addCase(getSubServiceById.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllSubServicesFullSlice = createSlice({
  name: "getAllSubServicesFull",
  initialState: {
    subServices: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSubServicesFull.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubServicesFull.fulfilled, (state, action) => {
      state.subServices = action.payload.subServices;
      state.isLoading = false;
    });
    builder.addCase(getAllSubServicesFull.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllSubServicesReducer = getAllSubServicesSlice.reducer;
export const getSubServiceByIdReducer = getSubServiceByIdSlice.reducer;
export const getAllSubServicesFullReducer = getAllSubServicesFullSlice.reducer;
