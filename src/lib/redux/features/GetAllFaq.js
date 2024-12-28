import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllFaq = createAsyncThunk(
  "getAllFaq",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllServiceFaq, {
        params: { page, limit, search },
      });
      return {
        faqs: response.data.data.serviceFaqs,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFaqSlice = createSlice({
  name: "getAllFaq",
  initialState: {
    faqs: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFaq.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFaq.fulfilled, (state, action) => {
      state.faqs = action.payload.faqs;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllFaq.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllFaqReducer = getAllFaqSlice.reducer;