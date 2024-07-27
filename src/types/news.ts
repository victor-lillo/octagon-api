export interface News {
  categoryId: string
  categoryName: string
  currentPosition: number
  date: Date
  fighter: string
  fighterName: string
  previousPosition: number | 'unranked'
}
