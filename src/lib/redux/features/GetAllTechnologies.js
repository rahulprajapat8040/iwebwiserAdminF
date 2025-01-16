import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";

export const getAllTechnology = createAsyncThunk(
  "getAllTechnology",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(Apis.getAllTechnology, {
        params: { page, limit, search },
      });
      return {
        technologys: response.data.data.technologys,
        pageInfo: response.data.data.pageInfo, // Include pageInfo in the response
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTechnologyFull = createAsyncThunk(
  "getAllTechnologyFull", 
  async () => {
    try {
      const response = await axios.get(`${Apis.getAllTechnologyFull}`);
      return {
        technologys: response.data.data.technologys,
      };
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }
)


export const getAllTechnologySlice = createSlice({
  name: "getAllTechnology",
  initialState: {
    technologies: [],
    pageInfo: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTechnology.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTechnology.fulfilled, (state, action) => {
      state.technologies = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllTechnology.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllTechnologyFullSlice = createSlice({
  name: "getAllTechnologyFull",
  initialState: {
    technologies: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTechnologyFull.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTechnologyFull.fulfilled, (state, action) => {  
      state.technologies = action.payload.technologys;
      state.isLoading = false;
    });
    builder.addCase(getAllTechnologyFull.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const getAllTechnologyReducer = getAllTechnologySlice.reducer;
export const getAllTechnologyFullReducer = getAllTechnologyFullSlice.reducer;