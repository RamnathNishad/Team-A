import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  registrationEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
  registrationEmail: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Common actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Registration actions
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
      state.registrationEmail = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // OTP verification actions
    verifyOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.registrationEmail = null;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: { id: string; email: string; name: string }; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
      // Persist to localStorage for recovery on page refresh
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Password reset actions
    passwordResetStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    passwordResetSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    passwordResetFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.registrationEmail = null;
      // Clear localStorage on logout
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    },

    // Restore auth state
    restoreAuth: (state, action: PayloadAction<{ user: { id: string; email: string; name: string }; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Set auth restored flag to indicate restoration is complete
    setAuthRestored: (state, action: PayloadAction<boolean>) => {
      // This action is used to signal that auth restoration is complete
      // Can be used to resolve the loading state
    },

    // Direct auth state setters
    setAuth: (state, action: PayloadAction<{ user: { id: string; email: string; name: string }; token: string; isAuthenticated: boolean }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      // Persist to localStorage for recovery on page refresh
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },

    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    updateUser: (state, action: PayloadAction<{ id: string; email: string; name: string }>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setLoading,
  clearError,
  registerStart,
  registerSuccess,
  registerFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  passwordResetStart,
  passwordResetSuccess,
  passwordResetFailure,
  logout,
  restoreAuth,
  setAuth,
  setAuthLoading,
  setAuthError,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
