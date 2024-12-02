import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PageResultVO, pageResultVOInit } from '@/types/vo/PageResultVO'
import { CategoryVO } from '@/types/vo/CategoryVO'
import { listCategoriesAdmin } from '@/api/category'
import { ConditionDTO } from '@/types/dto/ConditionDTO'

export const useCategoryStore = defineStore('category', () => {
  // 分类列表
  const pageCategories = ref<PageResultVO<CategoryVO>>(pageResultVOInit())
  const getAllCategoriesAsync = async (form: ConditionDTO) => {
    const pageResults: PageResultVO<CategoryVO> = await listCategoriesAdmin(form)
    pageCategories.value.count = pageResults.count
    pageCategories.value.records = pageResults.records
  }

  return {
    pageCategories,
    getAllCategoriesAsync
  }
})
