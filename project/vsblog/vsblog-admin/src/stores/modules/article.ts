import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFilteredArticles } from '@/api/article'
import { PageResultVO, pageResultVOInit } from '@/types/vo/PageResultVO'
import { ArticleAdminVO } from '@/types/vo/ArticleAdminVO'
import { ConditionDTO } from '@/types/dto/ConditionDTO'

export const useArticleStore = defineStore('article', () => {
  // 文章列表
  const pageArticles = ref<PageResultVO<ArticleAdminVO>>(pageResultVOInit())
  const getArticlesListAsync = async (form: ConditionDTO) => {
    const pageResults: PageResultVO<ArticleAdminVO> = await getFilteredArticles(form)
    pageArticles.value.count = pageResults.count
    pageArticles.value.records = pageResults.records
  }

  return {
    pageArticles,
    getArticlesListAsync
  }
})
