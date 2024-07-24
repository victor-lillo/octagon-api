export type Champion = {
  id: string
  championName: string
}

export type RankingFighter = {
  id: string
  name: string
}

export type Category = {
  categoryName: string
  champion: Champion
  fighters: RankingFighter[]
  id: string
}
