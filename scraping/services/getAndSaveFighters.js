import sleepWithLog from 'sleep-dots'
import { readDBFile, writeDBFile } from '../utils/db.js'
import saveRemoteImage from '../utils/saveRemoteImage.js'
import scrapeFighter from '../scrapers/scrapeFighter.js'
import { FIGHTERS_DB_NAME, RANKINGS_DB_NAME } from '../constants/names.js'
import { REQUEST_DELAY } from '../constants/config.js'

const getAndSaveFighters = async () => {
  const rankingData = await readDBFile(RANKINGS_DB_NAME)
  const previousFightersInfo = await readDBFile(FIGHTERS_DB_NAME)

  const fightersData = {}

  for (const { fighters } of rankingData) {
    for (const { id } of fighters) {
      const fighterInfo = await scrapeFighter(id)

      // For new fighters in our ranking, previousFightersInfo[id] is undef
      // So we return a void string as imgUrl
      const oldImgUrl = previousFightersInfo[id]?.imgUrl ?? ''

      if (fighterInfo.imgUrl !== oldImgUrl)
        await saveRemoteImage({
          fileName: id,
          url: imgUrl,
        })

      fightersData[id] = fighterInfo

      await sleepWithLog(REQUEST_DELAY)
    }
  }

  await writeDBFile(FIGHTERS_DB_NAME, fightersData)
}

export default getAndSaveFighters
