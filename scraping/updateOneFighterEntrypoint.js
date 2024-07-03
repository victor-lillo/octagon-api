import { logError, logReport } from './utils/log.js'
import { readDBFile } from './utils/db.js'
import { saveRemoteImage } from './utils/saveRemoteImage.js'
import { scrapeFighter } from './scrapers/scrapeFighter.js'
import { timeFormatter } from './utils/timeFormatter.js'
import { FIGHTERS_DB_NAME } from './constants/names.js'

const runUpdateOneFighterEntrypoint = async () => {
  const start = performance.now()
  const ARG_SELECTOR = '--'
  const firstArg = process.argv.find((el) => el.startsWith(ARG_SELECTOR))

  if (!firstArg) {
    logError('Introduce a correct argument. It musts start with "--"')
    return
  }
  const fighterId = firstArg.replace(ARG_SELECTOR, '')
  const previousFightersInfo = await readDBFile(FIGHTERS_DB_NAME)

  if (!previousFightersInfo[fighterId]) {
    logError(`Fighter with id '${fighterId}' doesn't exist`)
    return
  }

  const fighterInfo = await scrapeFighter(fighterId)
  const currentImgUrl = fighterInfo.imgUrl

  // For new fighters in our ranking, previousFightersInfo[id] is undef
  const oldImgUrl = previousFightersInfo[fighterId]?.imgUrl

  if (currentImgUrl !== oldImgUrl)
    await saveRemoteImage({
      fileName: fighterId,
      url: currentImgUrl,
    })

  const end = performance.now()
  const time = timeFormatter(end - start)

  console.log('')
  logReport({
    message: `Fighter [${fighterId}] updated`,
    time: time,
    folder: FIGHTERS_DB_NAME,
  })
}

runUpdateOneFighterEntrypoint()
