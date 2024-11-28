import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllArticles } from '@/api/article'
import { ArticleDataVO, articleDataVOInit } from '@/types/vo/ArticleDataVO'

export const useArticleStore = defineStore('article', () => {
  // 文章列表
  const articleData = ref<ArticleDataVO>(articleDataVOInit())
  const getArticlesListAsync = async () => {
    const data: ArticleDataVO = await getAllArticles()
    articleData.value.count = data.count
    articleData.value.records = data.records
  }

  return {
    articleData,
    getArticlesListAsync
  }
})
