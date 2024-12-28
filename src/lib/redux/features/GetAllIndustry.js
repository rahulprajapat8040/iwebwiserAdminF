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

export const getAllIndustryReducer = getAllIndustrySlice.reducer;