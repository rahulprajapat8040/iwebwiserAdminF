import { Apis } from "@/utils/Apis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllIndustry = createAsyncThunk("getAllIndustry", async () => {
  try {
    const response = await axios.get(Apis.getAllIndustry);
    return {
      industryData: response.data.data.industryData,
      pageInfo: response.data.data.pageInfo,
    };
  } catch (error) {
    console.log(error);
  }
});

export const getAllIndustryFull = createAsyncThunk(
  "getAllIndustryFull",
  async () => {
    try {
      const response = await axios.get(Apis.getAllIndustryFull);
      return {
        industryData: response.data.data.industryData,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllIndustrySlice = createSlice({
  name: "getAllIndustry",
  initialState: {
    industryData: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIndustry.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllIndustry.fulfilled, (state, action) => {
      state.industryData = action.payload.industryData;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllIndustry.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllIndustryFullSlice = createSlice({
  name: "getAllIndustryFull",
  initialState: {
    industryData: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIndustryFull.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllIndustryFull.fulfilled, (state, action) => {
      state.industryData = action.payload.industryData;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllIndustryFull.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllIndustryFullReducer = getAllIndustryFullSlice.reducer;

export const getAllIndustryReducer = getAllIndustrySlice.reducer;
