import { readDBFile, writeDBFile } from '../utils/db.js'
import saveImage from '../utils/saveImage.js'
import { FIGHTERS_DB_NAME, RANKINGS_DB_NAME } from '../constants/names.js'
import scrapeFighter from '../scrapers/scrapeFighter.js'
import { REQUEST_DELAY } from '../../octagon-api.config.js'
import sleepWithLog from 'sleep-dots'

const getAndSaveFighters = async () => {
  const rankingData = await readDBFile(RANKINGS_DB_NAME)
  const previousFightersInfo = await readDBFile(FIGHTERS_DB_NAME)

  const fightersData = {}

  for (const { fighters } of rankingData) {
    for (const { id } of fighters) {
      const fighterInfo = await scrapeFighter(id)

      // For new fighters in our ranking, FIGHTER_DATA[id] is undef
      // So we return a void string as imgUrl
      const oldImgUrl = previousFightersInfo[id]?.imgUrl ?? ''

      if (fighterInfo.imgUrl !== oldImgUrl)
        await saveImage({
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
