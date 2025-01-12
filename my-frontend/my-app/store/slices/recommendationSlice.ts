import { createSlice } from "@reduxjs/toolkit";
import { fetchQuizThunk, fetchRecommendationsThunk, recommendSimThunk } from "../thunks/recommendationThunk";

interface Recommendation{
  "Course Name":string;
  "Description":string;
  "Difficulty Level":string;
}
interface RecommendationState {
    data: any[];
    loading: boolean;
    error: string | null;
    quiz: any;
    recommendation: {
      recommendations: Recommendation[];
    };
  }
  
  // Initial state
  const initialState: RecommendationState = {
    data: [],
    loading: false,
    error: null,
    quiz: null,
    recommendation: {
      recommendations: [],
    },
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
          console.log("Recommendations", state.data);
        })
        .addCase(fetchRecommendationsThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(fetchQuizThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchQuizThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.quiz = action.payload;
        })
        .addCase(fetchQuizThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(recommendSimThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(recommendSimThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.recommendation = action.payload;
          console.log("heheheh: ", state.recommendation);
        })
        .addCase(recommendSimThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default recommendationSlice.reducer;