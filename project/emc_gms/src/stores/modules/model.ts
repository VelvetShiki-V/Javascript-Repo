import { ref } from 'vue'
import type { ModelInstance } from '@/type/model'
import { defineStore } from 'pinia'
import { getModelListService } from '@/api/modelService'

export const useModelStore = defineStore(
  'model',
  () => {
    // model
    const modelList = ref<Array<ModelInstance>>()
    const getModelListAsync = async () => {
      modelList.value = await getModelListService()
    }

    return {
      modelList,
      getModelListAsync
    }
  },
  {
    persist: true
  }
)
