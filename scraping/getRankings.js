import { compareRankings } from './lib/compareRankings.js'
import scrapeRankingInfo from './lib/scrapeRankingsInfo.js'

const getRankings = async () => {
  await scrapeRankingInfo()
  await compareRankings()
}

export default getRankings
