import { createSlice } from "@reduxjs/toolkit";
import {
  AddCatigoryService,
  AddDeviceService,
  GetAlerts,
  GetCarState,
  GetDevicesByCatigoryId,
  GetDevicesCount,
  updateDeviceSettings,
} from "../services/devicesService";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
  categoryData: [],
  CarState: [],
  alertsData:[]
};

const devicesSlice = createSlice({
  name: "Devices",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(GetDevicesCount.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(GetDevicesCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });

    builder.addCase(GetDevicesCount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(AddCatigoryService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(AddCatigoryService.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(AddCatigoryService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(AddDeviceService.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(AddDeviceService.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(AddDeviceService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(GetDevicesByCatigoryId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(GetDevicesByCatigoryId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categoryData = action.payload;
    });

    builder.addCase(GetDevicesByCatigoryId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(GetCarState.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(GetCarState.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.CarState = action.payload;
    });

    builder.addCase(GetCarState.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(updateDeviceSettings.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateDeviceSettings.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateDeviceSettings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });




    
    builder.addCase(GetAlerts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(GetAlerts.fulfilled, (state,action) => {
      state.isLoading = false;
      state.error = null;
      state.alertsData = action.payload
    });

    builder.addCase(GetAlerts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
  },
});

export default devicesSlice.reducer;
