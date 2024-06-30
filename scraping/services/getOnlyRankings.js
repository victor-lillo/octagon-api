import { compareRankings } from './compareRankings.js'
import { logSuccess } from '../utils/log.js'
import { renameFile } from '../utils/renameFile.js'
import { writeDBFile } from '../utils/db.js'
import scrapeRankings from '../scrapers/scrapeRankings.js'
import timeFormatter from '../utils/timeFormatter.js'

const run = async () => {
  const start = performance.now()

  const data = await scrapeRankings()
  await renameFile('rankings', 'rankings-old')
  await writeDBFile(RANKINGS_DB_NAME, data)

  await compareRankings()

  const end = performance.now()
  const time = timeFormatter(end - start)

  logSuccess(`\nTask finished in ${time}`)
}

run()
