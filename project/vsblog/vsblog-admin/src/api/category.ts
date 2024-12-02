import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { CategoryVO } from '@/types/vo/CategoryVO'
import { PageResultVO } from '@/types/vo/PageResultVO'
import request from '@/utils/request'

const listCategoriesAdmin = async (form: ConditionDTO): Promise<PageResultVO<CategoryVO>> => {
  const categories: PageResultVO<CategoryVO> = await request.get('/admin/categories', {
    params: form
  })
  // console.log('获取到后台文章分类: ', categories)
  return categories
}

export { listCategoriesAdmin }
