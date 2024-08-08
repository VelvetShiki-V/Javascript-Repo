import { emcRequest } from '@/api/crud'

export default {
  namespaced: true,
  state () {
    return {
      mainTable: [],
      relateTable: []
    }
  },
  mutations: {
    store_main_table (state, table) {
      state.mainTable = table
    },
    store_relate_table (state, table) {
      state.relateTable = table
    }
  },
  actions: {
    // 获取主表
    async browse_async (context, postData) {
      const data = await emcRequest.postBrowse(postData)
      context.commit('store_main_table', data)
    },
    // 获取关联表
    async browse_relate_async (context, postData) {
      const data = await emcRequest.postBrowse(postData)
      context.commit('store_relate_table', data)
    },
    // 获取所有表名
    async fetch_tables_async (context, postData) {
      return await emcRequest.postFetchAll(postData)
    },
    // 获取表结构
    async fetch_schema_async (context, postData) {
      return await emcRequest.postFetchSchema(postData)
    },
    // 插入
    async insert_async (context, postData) {
      await emcRequest.postCreate(postData)
    },
    // 更新
    async update_async (context, postData) {
      await emcRequest.postUpdate(postData)
    },
    // 删除
    async delete_async (context, postData) {
      await emcRequest.postDelete(postData)
    }
  }
}
