import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getArticleById, getFilteredArticles } from '@/api/article'
import { PageResultVO, pageResultVOInit } from '@/types/vo/PageResultVO'
import { ArticleAdminVO } from '@/types/vo/ArticleAdminVO'
import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { ArticleAdminViewVO, articleAdminViewVOInit } from '@/types/vo/ArticleAdminViewVO'

export const useArticleStore = defineStore('article', () => {
  // 文章列表
  const idArticle = ref<ArticleAdminViewVO>(articleAdminViewVOInit())
  const pageArticles = ref<PageResultVO<ArticleAdminVO>>(pageResultVOInit())
  // 获取筛选文章列表
  const getArticlesListAsync = async (form: ConditionDTO) => {
    const pageResults: PageResultVO<ArticleAdminVO> = await getFilteredArticles(form)
    pageArticles.value.count = pageResults.count
    pageArticles.value.records = pageResults.records
  }
  // 根据id获取文章
  const getArticleByIdAsync = async (id: number) => {
    idArticle.value = await getArticleById(id)
  }

  return {
    idArticle,
    pageArticles,
    getArticleByIdAsync,
    getArticlesListAsync
  }
})
