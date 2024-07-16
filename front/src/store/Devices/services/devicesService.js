import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const GetDevicesCount = createAsyncThunk(
  "Devices/GetDevicesCount",
  async (args, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://52.72.227.238:5000/device_counts`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);


export const AddCatigoryService = createAsyncThunk(
  "Devices/AddCatigoryService",
  async (args, thunkApi) => {
          const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `http://52.72.227.238:5000/add_category`,
        args, // Data to be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      console.log(data)
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);



export const AddDeviceService = createAsyncThunk(
  "Devices/AddDeviceService",
  async (args, thunkApi) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `http://52.72.227.238:5000/add_device`,
        args, // Data to be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      console.log(data);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);



export const GetDevicesByCatigoryId = createAsyncThunk(
  "Devices/GetDevicesByCatigoryId",
  async (args, thunkApi) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `http://52.72.227.238:5000/devices_by_category`,
        args, // Data to be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);


export const GetCarState = createAsyncThunk(
  "Devices/GetCarState",
  async (args, thunkApi) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `http://52.72.227.238:5000/latest_car_state`,
        args, // Data to be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);




export const updateDeviceSettings = createAsyncThunk(
  "Devices/updateDeviceSettings",
  async (args, thunkApi) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `http://52.72.227.238:5000/update_device_settings`,
        args, // Data to be sent in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      console.log(data)
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);




export const GetAlerts = createAsyncThunk(
  "Devices/GetAlerts",
  async (args, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://52.72.227.238:5000/alerts`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
      console.log(data)
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);