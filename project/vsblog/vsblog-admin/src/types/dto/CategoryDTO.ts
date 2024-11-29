// 文章分类表单
export type CategoryDTO = {
  id: number
  categoryName: string
}

export const categoryDTOInit = (): CategoryDTO => {
  return {
    id: 0,
    categoryName: ''
  }
}
