import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// path为node内置变量，需要引入node模块的类型声明文件: npm i @types/node -D
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 进行/src -> @/路径解析配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
