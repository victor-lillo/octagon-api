import { compareRankings } from './services/compareRankings.js'
import { logSuccess } from './utils/log.js'
import { renameDBFile, writeDBFile } from './utils/db.js'
import scrapeRankings from './scrapers/scrapeRankings.js'
import { RANKINGS_DB_NAME, RANKINGS_OLD_DB_NAME } from './constants/index.js'

const getRankings = async () => {
  const data = await scrapeRankings()
  await renameDBFile(RANKINGS_DB_NAME, RANKINGS_OLD_DB_NAME)
  await writeDBFile(RANKINGS_DB_NAME, data)

  logSuccess(`Rankings saved in ${RANKINGS_DB_NAME}\n`)

  await compareRankings()
}

export default getRankings
