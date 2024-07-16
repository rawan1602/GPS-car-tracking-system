import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,  // This will expose the server to the network
    port: 8080   // Change this to your desired port number
  },
  plugins: [react()],
});
