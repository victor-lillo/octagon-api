import { logSuccess } from '../utils/log.js'
import { readDBFile, writeDBFile } from '../utils/db.js'
import { NEWS_DB_NAME, RANKINGS_DB_NAME, RANKINGS_OLD_DB_NAME } from '../constants/names.js'

const STORED_CHANGES_NUM = 10

const newRanking = await readDBFile(RANKINGS_DB_NAME)
const oldRanking = await readDBFile(RANKINGS_OLD_DB_NAME)
const rankingChanges = await readDBFile(NEWS_DB_NAME)
const date = new Date()

export const compareRankings = async () => {
  for (const key in newRanking) {
    const categoryName = newRanking[key].categoryName
    const categoryId = newRanking[key].id
    const fightersArray = newRanking[key].fighters
    const fightersOldArray = oldRanking[key].fighters

    for (const key in fightersArray) {
      const intKey = parseInt(key)

      const { id: currentFighter, name: fighterName } = fightersArray[key]

      if (currentFighter !== fightersOldArray[key]?.id) {
        const previousPosition = fightersOldArray.findIndex(({ id }) => {
          return id === currentFighter
        })

        const isSaved = rankingChanges.find(
          (el) => el.fighter === currentFighter && el.currentPosition === intKey
        )

        if (!isSaved)
          rankingChanges.unshift({
            fighter: currentFighter,
            fighterName,
            categoryId,
            categoryName,
            currentPosition: intKey,
            previousPosition: previousPosition === -1 ? 'unranked' : previousPosition,
            date,
          })
      }
    }
  }
  const limitedRankingChanges = rankingChanges.slice(0, STORED_CHANGES_NUM)
  await writeDBFile(NEWS_DB_NAME, limitedRankingChanges)

  logSuccess('Ranking changes saved\n')
}
