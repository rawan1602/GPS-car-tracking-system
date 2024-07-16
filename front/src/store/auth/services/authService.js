import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const SignUp = createAsyncThunk(
  "Auth/SignUp",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post(
        `http://52.72.227.238:5000/signup`,
        args, // Data to be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);



export const LoginService = createAsyncThunk("Auth/Login", async (args, thunkApi) => {
  try {
    const { data } = await axios.post(
      `http://52.72.227.238:5000/signin`,
      args, // Data to be sent in the request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return thunkApi.fulfillWithValue(data);
  } catch (e) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});
