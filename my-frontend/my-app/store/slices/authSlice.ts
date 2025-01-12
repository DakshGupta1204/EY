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
      localStorage.setItem('userId', action.payload.user.id); // Optional: Save userId to localStorage
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
      state.token = action.payload.token;
      state.user = action.payload.user; // Now action.payload has the 'user' field
      state.verified = true;
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
      localStorage.setItem('userId', action.payload.user._id); // Save userId to localStorage
      
    });
    
    builder.addCase(loginUserThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
