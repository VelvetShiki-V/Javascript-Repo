// 文章过滤表单
export type ConditionDTO = {
  current: number
  size: number
  keywords: string
  categoryId: number
  tagId: number
  type: number
  status: number
  isDelete: number
}

export const conditionDTOInit = (): ConditionDTO => {
  return {
    current: 1,
    size: 10,
    keywords: '',
    categoryId: 0,
    tagId: 0,
    type: 0,
    status: 0,
    isDelete: 0
  }
}
