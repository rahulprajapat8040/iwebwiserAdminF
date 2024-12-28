import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllBlog = createAsyncThunk(
  "getAllBlog",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllBlog, {
        params: { page, limit, search },
      });
      return {
        blogs: response.data.data.blogs,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBlogSlice = createSlice({
  name: "getAllBlog",
  initialState: {
    blogs: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.blogs = action.payload.blogs;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllBlog.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllBlogReducer = getAllBlogSlice.reducer;
