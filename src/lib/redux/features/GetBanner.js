import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { Apis } from "@/utils/Apis";
import axios from "axios";
 
export const getAllBanner = createAsyncThunk("getAllBanner", async () => {
  try {
    const response = await axios.get(Apis.getAllBanner);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getAllBannerSlice = createSlice({
  name: "getAllBanner",
  initialState: {
    banners: [],
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBanner.pending, (state) => {      
        state.isLoading = true;
      });
    builder.addCase(getAllBanner.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.isLoading = false;
      });
      builder.addCase(getAllBanner.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const getAllBannerReducer = getAllBannerSlice.reducer;