export type Champion = {
  id: string
  championName: string
}

export type DivisionFighter = {
  id: string
  name: string
}

export type Division = {
  categoryName: string
  champion: Champion
  fighters: DivisionFighter[]
  id: string
}
