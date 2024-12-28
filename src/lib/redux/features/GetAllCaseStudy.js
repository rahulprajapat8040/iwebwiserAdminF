import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Apis } from "@/utils/Apis";

export const getAllCaseStudy = createAsyncThunk(
  "getAllCaseStudy",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllCaseStudy, {
        params: { page, limit, search },
      });
      return {
        caseStudyData: response.data.data.caseStudies,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCaseStudySlice = createSlice({
  name: "getAllCaseStudy",
  initialState: {
    caseStudyData: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCaseStudy.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCaseStudy.fulfilled, (state, action) => {
      state.caseStudyData = action.payload.caseStudyData;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllCaseStudy.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllCaseStudyReducer = getAllCaseStudySlice.reducer;
