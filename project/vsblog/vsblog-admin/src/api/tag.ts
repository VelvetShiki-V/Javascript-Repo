import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { PageResultVO } from '@/types/vo/PageResultVO'
import { TagVO } from '@/types/vo/TagVO'
import request from '@/utils/request'

const listTagsAdmin = async (form: ConditionDTO): Promise<PageResultVO<TagVO>> => {
  const tags: PageResultVO<TagVO> = await request.get('/admin/tags', {
    params: form
  })
  // console.log('获取到后台文章标签: ', tags)
  return tags
}

export { listTagsAdmin }
