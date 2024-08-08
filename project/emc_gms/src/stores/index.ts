import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

// 子模块仓库统一管理

export default pinia
export * from './modules/user'
export * from './modules/model'
