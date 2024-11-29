// 文章删除表单
export type ArticleFilterDTO = {
  ids: Array<number>
  isDelete: number
}

export const articleFilterDTOInit = (): ArticleFilterDTO => {
  return {
    ids: [],
    isDelete: 0
  }
}
