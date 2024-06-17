import getFighters from './getFighters.js'
import getRankings from './getRankings.js'
import { logInfo, logSuccess } from './utils/log.js'

logInfo('RUNNING COMPLETE SCRAPER\n')
await getRankings()
await getFighters()
logSuccess('Scraper finished')
