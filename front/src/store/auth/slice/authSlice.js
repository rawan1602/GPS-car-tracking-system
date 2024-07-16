import { createSlice } from "@reduxjs/toolkit";
import {   LoginService, SignUp } from "../services/authService";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const authSlice = createSlice({
  name: "Auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(SignUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(SignUp.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(SignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });



        builder.addCase(LoginService.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        });

        builder.addCase(LoginService.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          localStorage.setItem("token", action.payload.access_token);
          localStorage.setItem("user_id", action.payload.user_id);
        });

        builder.addCase(LoginService.rejected, (state,action) => {
          state.isLoading = false;
        
          state.error = action.payload.error;
        });
  },
});


export default authSlice.reducer;

