import { logSuccess } from '../utils/log.js'
import { renameDBFile, writeDBFile } from '../utils/db.js'
import scrapeRankings from '../scrapers/scrapeRankings.js'
import timeFormatter from '../utils/timeFormatter.js'
import { RANKINGS_DB_NAME, RANKINGS_OLD_DB_NAME } from '../constants/names.js'

export const getAndSaveRankings = async () => {
  const start = performance.now()

  const data = await scrapeRankings()
  await renameDBFile(RANKINGS_DB_NAME, RANKINGS_OLD_DB_NAME)
  await writeDBFile(RANKINGS_DB_NAME, data)

  const end = performance.now()
  const time = timeFormatter(end - start)

  logSuccess(`Rankings scraper task finished in ${time}\n`)
}
