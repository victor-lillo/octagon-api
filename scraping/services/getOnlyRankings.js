import { compareRankings } from './compareRankings.js'
import { logSuccess } from '../utils/log.js'
import scrapeRankings from '../scrapers/scrapeRankings.js'
import timeFormatter from '../utils/timeFormatter.js'

const run = async () => {
  const start = performance.now()

  await scrapeRankings()
  await compareRankings()

  const end = performance.now()
  const time = timeFormatter(end - start)
  console.log(' ')
  logSuccess(`Task finished in ${time}`)
}

run()
