import { compareAndSaveRankings } from './services/compareAndSaveRankings.js'
import { getAndSaveFighters } from './services/getAndSaveFighters.js'
import { getAndSaveRankings } from './services/getAndSaveRankings.js'
import { logReport } from './utils/log.js'
import { timeFormatter } from './utils/timeFormatter.js'

const runMainEntrypoint = async () => {
  const start = performance.now()
  console.log('Starting scraping process from runMainEntrypoint...\n')

  await getAndSaveRankings()
  await compareAndSaveRankings()
  await getAndSaveFighters()

  const end = performance.now()
  const time = timeFormatter(end - start)

  logReport({
    message: 'Rankings & Fighters scraper finished',
    time: time,
  })
}

runMainEntrypoint()
