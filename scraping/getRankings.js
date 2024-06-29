import { compareRankings } from './services/compareRankings.js'
import scrapeRankingInfo from './scrapers/scrapeRankingsInfo.js'

const getRankings = async () => {
  await scrapeRankingInfo()
  await compareRankings()
}

export default getRankings
