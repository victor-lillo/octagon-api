import { compareAndSaveRankings } from './services/compareAndSaveRankings.js'
import { getAndSaveFighters } from './services/getAndSaveFighters.js'
import { getAndSaveRankings } from './services/getAndSaveRankings.js'
import { logInfo, logSuccess } from './utils/log.js'

const runMainEntrypoint = async () => {
  logInfo('RUNNING COMPLETE SCRAPER\n')
  console.log('Starting scraping process from runMainEntrypoint...')
  await getAndSaveRankings()

  console.log('Starting compareAndSaveRankings...')
  await compareAndSaveRankings()

  await getAndSaveFighters()
  logSuccess('Scraper finished')
}

runMainEntrypoint()
