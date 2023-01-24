import getFigthers from './getFigthers.js'
import getRankings from './getRankings.js'
import { logInfo, logSuccess } from './lib/log.js'

logInfo('RUNNING COMPLETE SCRAPER\n')
await getRankings()
await getFigthers()
logSuccess('Scraper finished')
