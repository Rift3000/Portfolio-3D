import { defineConfig } from "vite";

export default defineConfig({
  build: {
     assetsInlineLimit: '10048', 
    chunkSizeWarningLimit: '10048'  
  }
});