import { compareRankings } from './services/compareRankings.js'
import { logSuccess } from './utils/log.js'
import { renameFile } from './utils/renameFile.js'
import { writeDBFile } from './utils/db.js'
import scrapeRankings from './scrapers/scrapeRankings.js'

const RANKINGS_DB_NAME = 'rankings'

const getRankings = async () => {
  const data = await scrapeRankings()
  await renameFile('rankings' + '.json', 'rankings-old' + '.json')
  await writeDBFile(RANKINGS_DB_NAME, data)

  logSuccess(`Rankings saved in ${RANKINGS_DB_NAME}.json\n`)

  await compareRankings()
}

export default getRankings
