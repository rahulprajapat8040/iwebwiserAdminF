import { Apis } from "@/utils/Apis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSteps = createAsyncThunk(
  "getSteps",
  async () => {
    try {
      const response = await axios.get(`${Apis.getAllSetp}`);
      return {
        steps: response.data.data,
      };
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }
);

export const getStepsSlice = createSlice({
  name: "getSteps",
  initialState: {
    steps: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getSteps.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSteps.fulfilled, (state, action) => {
      state.steps = action.payload.steps;
      state.isLoading = false;
    });
    builder.addCase(getSteps.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getStepsReducer = getStepsSlice.reducer;