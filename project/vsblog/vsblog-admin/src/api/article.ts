import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { ArticleAdminVO } from '@/types/vo/ArticleAdminVO'
import { PageResultVO } from '@/types/vo/PageResultVO'
import request from '@/utils/request'

// 根据条件获取后台文章列表
const getFilteredArticles = async (
  form: ConditionDTO
): Promise<PageResultVO<ArticleAdminVO>> => {
  console.log('文章列表条件获取')
  const pageResults: PageResultVO<ArticleAdminVO> = await request.get(
    `/admin/articles
      ?isDelete=${form.isDelete}
      ?current=${form.current}
      ?size=${form.size}
      ?keywords=${form.keywords}
      ?categoryId=${form.categoryId}
      ?tagId=${form.tagId}
      ?type=${form.type}
      ?status=${form.status}
    `
  )
  console.log('获取到文章数据: ', pageResults)
  return pageResults
}

// 根据id获取后台文章
const getArticleById = async (id: number): Promise<ArticleAdminVO> => {
  console.log('获取id为' + id + '的文章')
  const article: ArticleAdminVO = await request.get(`/${id}`)
  console.log('获取到id为' + id + '的文章数据: ', article)
  return article
}

export { getFilteredArticles, getArticleById }
