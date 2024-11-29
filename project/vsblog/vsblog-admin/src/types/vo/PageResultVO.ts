// 文章列表渲染
export type PageResultVO<T> = {
  records: Array<T>
  count: number
}

export const pageResultVOInit = <T>(): PageResultVO<T> => {
  return {
    records: [],
    count: 0
  }
}
