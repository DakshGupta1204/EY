import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUserThunk, loginUserThunk } from '../thunks/authThunks';

interface AuthState {
  user: {
    id?: string;
    email?: string;
    name?: string;
  } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  verified:boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  verified:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Optional: Clear token from localStorage
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Optional: Save token to localStorage
      state.verified = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Login User
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Optional: Save token to localStorage
      state.verified = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
