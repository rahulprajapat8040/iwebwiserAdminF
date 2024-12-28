import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Apis } from "@/utils/Apis";

export const getAllLinkPages = createAsyncThunk("getAllLinkPages", async () => {
  const response = await axios.get(Apis.getAllHeader);
  return response.data;
});

export const getAllSubLinkPages = createAsyncThunk(
  "getAllSubLinkPages",
  async () => {
    const response = await axios.get(Apis.getAllSubLinkPages);
    console.log(response)
    return response.data;
  }
);


export const getAllNavItems = createAsyncThunk(
  "getAllNavItems", 
  async () => {
    const response = await axios.get(Apis.getAllNavbar);
    return response.data.data;
  }
)

export const getAllSubChildLinkPages = createAsyncThunk(
  "getAllSubChildLinkPages",
  async () => {
    const response = await axios.get(Apis.getAllSubChildLinkPages);
    return response.data;
  }
);

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
};


const getAllLinkPagesSlice = createSlice({
  name: "getAllLinkPages",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllLinkPages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllLinkPages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllLinkPages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

const getAllSubLinkPagesSlice = createSlice({
  name: "getAllSubLinkPages",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllSubLinkPages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubLinkPages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllSubLinkPages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

const getAllNavItemsSlice = createSlice({
  name: "getAllNavItems",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllNavItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNavItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllNavItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});


const getAllSubChildLinkPagesSlice = createSlice({
  name: "getAllSubChildLinkPages",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllSubChildLinkPages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubChildLinkPages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllSubChildLinkPages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
}); 

export const getAllLinkPagesReducer = getAllLinkPagesSlice.reducer;
export const getAllSubLinkPagesReducer = getAllSubLinkPagesSlice.reducer;
export const getAllNavItemsReducer = getAllNavItemsSlice.reducer;
export const getAllSubChildLinkPagesReducer = getAllSubChildLinkPagesSlice.reducer;
