
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const getUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined" || user === "null") return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }
  return null;
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isAuthenticated: !!getTokenFromStorage(),
  loading: false,
  error: null,
  registrationEmail: null, // For OTP verification
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
      state.error = null;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    
    registerSuccess: (state, action) => {
      const { user, accessToken, email } = action.payload;
      
      if (accessToken) {
        // If registration returns token (auto-login)
        state.user = user;
        state.token = accessToken;
        state.isAuthenticated = true;
        
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", JSON.stringify(user));
        }
      } else {
        // If registration requires email verification
        state.registrationEmail = email;
      }
      
      state.error = null;
    },
    
    otpVerificationSuccess: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
      state.registrationEmail = null;
      state.error = null;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.registrationEmail = null;
      state.error = null;
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    setRegistrationEmail: (state, action) => {
      state.registrationEmail = action.payload;
    },
  },
});

export const {
  loginSuccess,
  registerSuccess,
  otpVerificationSuccess,
  logout,
  setLoading,
  setError,
  clearError,
  setRegistrationEmail,
} = authSlice.actions;

export default authSlice.reducer;