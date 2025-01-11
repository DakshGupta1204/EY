import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendationsThunk } from "../thunks/recommendationThunk";
interface RecommendationState {
    data: any[];
    loading: boolean;
    error: string | null;
  }
  
  // Initial state
  const initialState: RecommendationState = {
    data: [],
    loading: false,
    error: null,
  };

  const recommendationSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecommendationsThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRecommendationsThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchRecommendationsThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default recommendationSlice.reducer;