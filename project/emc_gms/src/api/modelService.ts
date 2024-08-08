import type { ModelInstance } from '@/type/model'
import request from '@/utils/request'

const getModelListService = async (): Promise<Array<ModelInstance>> => {
  console.log('数据模型查询请求')
  return await request.get('/model')
}

export { getModelListService }
