import getFighters from './getFighters.js'
import getRankings from './rankingsEntrypoint.js'
import { logInfo, logSuccess } from './utils/log.js'

const runMainEntrypoint = async () => {
  logInfo('RUNNING COMPLETE SCRAPER\n')
  await getRankings()
  await getFighters()
  logSuccess('Scraper finished')
}

runMainEntrypoint()
