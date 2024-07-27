export interface Champion {
  id: string
  championName: string
}

export interface DivisionFighter {
  id: string
  name: string
}

export interface Division {
  categoryName: string
  champion: Champion
  fighters: DivisionFighter[]
  id: string
}
