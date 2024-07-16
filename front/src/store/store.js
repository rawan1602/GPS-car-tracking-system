import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice/authSlice";
import devicesSlice from "./Devices/slice/devicesSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    devicesSlice: devicesSlice,
  },
});


export default store;