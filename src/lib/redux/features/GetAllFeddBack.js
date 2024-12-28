import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllFeedback = createAsyncThunk(
  "getAllFeedback",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllFeedback, {
        params: { page, limit, search },
      });
      return {
        feedbacks: response.data.data.feedbacks,
        pageInfo: response.data.data.pageInfo, // Include pageInfo in the response
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFeedbackSlice = createSlice({
  name: "getAllFeedback",
  initialState: {
    feedbacks: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFeedback.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFeedback.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllFeedback.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllFeedbackReducer = getAllFeedbackSlice.reducer;
