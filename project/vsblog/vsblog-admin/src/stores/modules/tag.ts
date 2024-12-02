import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PageResultVO, pageResultVOInit } from '@/types/vo/PageResultVO'
import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { TagVO } from '@/types/vo/TagVO'
import { listTagsAdmin } from '@/api/tag'

export const useTagStore = defineStore('tag', () => {
  // 文章列表
  const pageTags = ref<PageResultVO<TagVO>>(pageResultVOInit())
  const getAllTagsAsync = async (form: ConditionDTO) => {
    const pageResults: PageResultVO<TagVO> = await listTagsAdmin(form)
    pageTags.value.count = pageResults.count
    pageTags.value.records = pageResults.records
  }

  return {
    pageTags,
    getAllTagsAsync
  }
})
