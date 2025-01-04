import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:3000";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Register User Thunk
export const registerUserThunk = createAsyncThunk<any, RegisterPayload>(
  "auth/register",
  async (
    payload,{rejectWithValue}
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Login User Thunk
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
