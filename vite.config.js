import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInlineLimit: '40048', 
    chunkSizeWarningLimit: '40048'  
  }
});