import { FIGHTERS_DB_NAME } from '../constants/names.js'
import scrapeFighter from '../scrapers/scrapeFighter.js'
import { readDBFile } from '../utils/db.js'
import { logError, logSuccess } from '../utils/log.js'
import timeFormatter from '../utils/timeFormatter.js'

const run = async () => {
  const start = performance.now()
  const ARG_SELECTOR = '--'
  const firstArg = process.argv.find((el) => el.startsWith(ARG_SELECTOR))

  if (!firstArg) {
    logError('Introduce a correct argument. It musts start with "--"')
    return
  }
  const fighterId = firstArg.replace(ARG_SELECTOR, '')
  const FIGHTER_DATA = await readDBFile(FIGHTERS_DB_NAME)

  if (!FIGHTER_DATA[fighterId]) {
    logError(`Fighter with id '${fighterId}' doesn't exist`)
    return
  }

  await scrapeFighter(fighterId)

  const end = performance.now()
  const time = timeFormatter(end - start)

  logSuccess(`\nTask finished in ${time}`)
}

run()
