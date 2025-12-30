
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // 設定 base 為空字串或 './' 確保在 GitHub Pages 的子目錄下能正確讀取資源
  base: './',
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
