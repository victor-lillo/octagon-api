import sleepWithLog from 'sleep-dots'
import { logSuccess } from '../utils/log.js'
import { readDBFile } from '../utils/db.js'
import { REQUEST_DELAY } from '../../octagon-api.config.js'
import scrapeFighter from '../scrapers/scrapeFighter.js'
import timeFormatter from '../utils/timeFormatter.js'
import { RANKINGS_DB_NAME } from '../constants/names.js'

const getFighters = async () => {
  const start = performance.now()
  const rankingData = await readDBFile(RANKINGS_DB_NAME)

  for (const { fighters } of rankingData) {
    for (const { id } of fighters) {
      await scrapeFighter(id)
      console.log(`Waiting ${timeFormatter(REQUEST_DELAY)}\n`)
      await sleepWithLog(REQUEST_DELAY)
    }
  }

  const end = performance.now()
  const time = timeFormatter(end - start)
  logSuccess(`Task finished in ${time}`)
}

export default getFighters
