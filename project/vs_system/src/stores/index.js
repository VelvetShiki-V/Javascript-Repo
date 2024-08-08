import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist) // 数据持久化存储(localStorage)

// 子模块仓库统一管理
export default pinia
export * from './modules/user'
