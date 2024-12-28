import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllBranch = createAsyncThunk(
  "getAllBranch",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllBranch, {
        params: { page, limit, search },
      });
      return {
        branches: response.data.data.branches,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBranchSlice = createSlice({
  name: "getAllBranch",
  initialState: {
    branches: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBranch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBranch.fulfilled, (state, action) => {
      state.branches = action.payload.branches;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllBranch.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllBranchReducer = getAllBranchSlice.reducer;
