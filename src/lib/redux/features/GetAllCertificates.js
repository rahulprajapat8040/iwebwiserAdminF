import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllCertificates = createAsyncThunk(
  "getAllCertificates",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllCertificate, {
        params: { page, limit, search },
      });
      return {
        certificates: response.data.data.certificates,
        pageInfo: response.data.data.pageInfo,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCertificatesSlice = createSlice({
  name: "getAllCertificates",
  initialState: {
    certificates: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCertificates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCertificates.fulfilled, (state, action) => {
      state.certificates = action.payload.certificates;
      state.pageInfo = action.payload.pageInfo;
      state.isLoading = false;
    });
    builder.addCase(getAllCertificates.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllCertificatesReducer = getAllCertificatesSlice.reducer;
