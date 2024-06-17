import scrapeFighterInfo from '../lib/scrapeFighterInfo.js'
import { readDBFile } from '../utils/db.js'
import { logError, logSuccess } from '../utils/log.js'
import timeFormatter from '../utils/timeFormatter.js'

const run = async () => {
  const start = performance.now()
  const ARG_SELECTOR = '--'
  const firstArg = process.argv.find((el) => el.startsWith(ARG_SELECTOR))

  // Guard clause 1
  if (!firstArg) {
    logError('Introduce a correct argument. It musts start with "--"')
    return
  }
  const fighterId = firstArg.replace(ARG_SELECTOR, '')
  const FIGHTER_DATA = await readDBFile('fighters')

  // Guard clause 2
  if (!FIGHTER_DATA[fighterId]) {
    logError(`Fighter with id '${fighterId}' doesn't exist`)
    return
  }

  await scrapeFighterInfo(fighterId)
  const end = performance.now()
  const time = timeFormatter(end - start)
  console.log('')
  logSuccess(`Task finished in ${time}`)
}

run()
