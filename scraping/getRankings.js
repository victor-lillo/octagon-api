import { compareRankings } from './services/compareRankings.js'
import scrapeRanking from './scrapers/scrapeRankings.js'

const getRankings = async () => {
  await scrapeRanking()
  await compareRankings()
}

export default getRankings
