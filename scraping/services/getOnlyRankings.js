import { compareRankings } from '../lib/compareRankings.js'
import { logSuccess } from '../lib/log.js'
import scrapeRankingsInfo from '../lib/scrapeRankingsInfo.js'
import timeFormatter from '../lib/timeFormatter.js'

const run = async () => {
  const start = performance.now()

  await scrapeRankingsInfo()
  await compareRankings()

  const end = performance.now()
  const time = timeFormatter(end - start)
  logSuccess(`\nTask finished in ${time}`)
}

run()
