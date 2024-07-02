import getAndSaveFighters from './services/getAndSaveFighters.js'
import getRankings from './rankingsEntrypoint.js'
import { logInfo, logSuccess } from './utils/log.js'

const runMainEntrypoint = async () => {
  logInfo('RUNNING COMPLETE SCRAPER\n')
  await getRankings()
  await getAndSaveFighters()
  logSuccess('Scraper finished')
}

runMainEntrypoint()
