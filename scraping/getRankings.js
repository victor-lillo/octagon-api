import scrapeRankingInfo from './lib/scrapeRankingsInfo.js'

const getRankings = async () => {
  await scrapeRankingInfo()
}

export default getRankings
