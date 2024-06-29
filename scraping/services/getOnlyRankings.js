import { compareRankings } from './compareRankings.js'
import { logSuccess } from '../utils/log.js'
import scrapeRankingsInfo from '../scrapers/scrapeRankingsInfo.js'
import timeFormatter from '../utils/timeFormatter.js'

const run = async () => {
  const start = performance.now()

  await scrapeRankingsInfo()
  await compareRankings()

  const end = performance.now()
  const time = timeFormatter(end - start)
  console.log(' ')
  logSuccess(`Task finished in ${time}`)
}

run()
