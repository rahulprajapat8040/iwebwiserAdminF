import { Apis } from "@/utils/Apis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllIndustryDetail = createAsyncThunk("getAllIndustryDetail", async () => {
  try {
    const response = await axios.get(Apis.getAllIndustryDetail);
    return {
      industryDetail: response.data.data.industryPages,
    };
  } catch (error) {
    console.log(error);
  }
});

export const getAllIndustryDetailSlice = createSlice({
  name: "getAllIndustryDetail",
  initialState: {
    industryDetail: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIndustryDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllIndustryDetail.fulfilled, (state, action) => {
      state.industryDetail = action.payload.industryDetail;
      state.isLoading = false;
    });
    builder.addCase(getAllIndustryDetail.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});     

export const getAllIndustryDetailReducer = getAllIndustryDetailSlice.reducer;