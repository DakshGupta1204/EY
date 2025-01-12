import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RecommendPayload {
  current_course: string;
}

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

  export const fetchQuizThunk = createAsyncThunk(
    'quiz/fetchQuiz',
    async ({ quiz_context, num_questions, quiz_type }: { quiz_context: string; num_questions: number; quiz_type: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`http://localhost:3000/quiz`, {
          quiz_context,
          num_questions,
          quiz_type,
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch quiz');
      }
    }
  );

  export const recommendSimThunk = createAsyncThunk(
    'recommend/recommendSim',
    async (payload: RecommendPayload, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/recommendSim', payload); // Update with your base API URL if needed
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data || { message: 'An unexpected error occurred' }
        );
      }
    }
  );