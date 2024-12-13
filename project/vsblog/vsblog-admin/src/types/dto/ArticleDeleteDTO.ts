// 文章删除表单
export type ArticleDeleteDTO = {
  ids: Array<number>
  isDelete: number
}

export const articleDeleteDTOInit = (): ArticleDeleteDTO => {
  return {
    ids: [],
    isDelete: 0
  }
}
