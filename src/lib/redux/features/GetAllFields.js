import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Apis } from "@/utils/Apis";

export const getAllFields = createAsyncThunk("getAllFields", async () => {
  try {
    const response = await axios.get(Apis.getAllField);
    return response.data.data; // Return just the data array directly
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to be handled by rejected case
  }
});

export const getAllFieldsSlice = createSlice({
  name: "getAllFields",
  initialState: {
    fields: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFields.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFields.fulfilled, (state, action) => {
      state.fields = action.payload; // Store the data array directly
      state.isLoading = false;
    });
    builder.addCase(getAllFields.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllFieldReducer = getAllFieldsSlice.reducer;
