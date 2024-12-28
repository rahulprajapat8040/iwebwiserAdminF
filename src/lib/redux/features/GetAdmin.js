import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Apis } from "@/utils/Apis";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export const getAdmin = createAsyncThunk("getAdmin", async () => {
  const token = Cookies.get("admin");
  if (!token) {
    throw new Error("No token found");
  }
  const adminId = jwtDecode(token)?.id;
  if (!adminId) {
    throw new Error("Invalid token");
  }
  try {
    const response = await axios.get(`${Apis.getAdmin}/${adminId}`);
    return response.data.data;
  } catch (error) {
    console.error("Get Admin Error: ", error);
    throw error;
  }
});

export const adminSlice = createSlice({
  name: "getAdmin",
  initialState: {
    admin: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAdmin.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const adminReducer = adminSlice.reducer;
