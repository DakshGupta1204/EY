import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecommendationsThunk = createAsyncThunk(
    'recommendations/fetchRecommendations',
    async (params: { interest: string; skills: string; level: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/recommend', params);
        return response.data;
      } catch (error:any) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
      }
    }
  );