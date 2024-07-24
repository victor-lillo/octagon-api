export type Fighter = {
  age: string
  category: string
  draws: string
  fightingStyle: string
  height: string
  imgUrl: string
  legReach: string
  losses: string
  name: string
  nickname: string
  octagonDebut: string
  placeOfBirth: string
  reach: string
  status: string
  trainsAt: string
  weight: string
  wins: string
}

export type Fighters = {
  [key: string]: Fighter
}
