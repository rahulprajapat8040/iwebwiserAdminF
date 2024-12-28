import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Apis } from "@/utils/Apis";

export const getAllSocialMedia = createAsyncThunk(
  "getAllSocialMedia",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllSocialMedia, {
        params: { page, limit, search },
      });
      return {
        socialData: response.data.data.socialData,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllSocialMediaSlice = createSlice({
  name: "getAllSocialMedia",
  initialState: {
    socialData: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSocialMedia.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSocialMedia.fulfilled, (state, action) => {
      state.socialData = action.payload.socialData;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllSocialMedia.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllSocialMediaReducer = getAllSocialMediaSlice.reducer;
