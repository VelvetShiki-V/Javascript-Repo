import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllArticles } from '@/api/article'
import { ArticleAdmin } from '@/types/article'

export const useArticleStore = defineStore('article', () => {
  // 文章列表
  const articleList = ref<Array<ArticleAdmin>>([])
  const getArticlesListAsync = async () => {
    articleList.value = await getAllArticles()
  }

  return {
    getArticlesListAsync
  }
})
