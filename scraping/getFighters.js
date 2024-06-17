import sleepWithLog from 'sleep-dots'
import { logSuccess } from './utils/log.js'
import { readDBFile } from './utils/db.js'
import { REQUEST_DELAY } from '../octagon-api.config.js'
import scrapeFighterInfo from './lib/scrapeFighterInfo.js'
import timeFormatter from './utils/timeFormatter.js'

async function getFighters() {
  const start = performance.now()
  const ranking_data = await readDBFile('rankings')

  for (const { fighters } of ranking_data) {
    for (const { id } of fighters) {
      await scrapeFighterInfo(id)
      console.log(`Waiting ${timeFormatter(REQUEST_DELAY)}\n`)
      await sleepWithLog(REQUEST_DELAY)
    }
  }

  const end = performance.now()
  const time = timeFormatter(end - start)
  logSuccess(`Task finished in ${time}`)
}

export default getFighters
