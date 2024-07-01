import getAndSaveFighters from './services/getAndSaveFighters.js'
import { logInfo, logSuccess } from './utils/log.js'

const runFightersEntrypoint = async () => {
  logInfo('RUNNING Scraper entrypoint SCRAPER\n')
  await getAndSaveFighters()
  logSuccess('Scraper finished')
}

runFightersEntrypoint()
