import { logInfo } from '../utils/log.js'
import { readDBFile } from '../utils/db.js'
import { NEWS_DB_NAME, RANKINGS_DB_NAME, RANKINGS_OLD_DB_NAME } from '../constants/names.js'

export const getRankingsChanges = async () => {
  logInfo(`Comparing rankings changes ['${RANKINGS_DB_NAME}' vs '${RANKINGS_OLD_DB_NAME}']\n`)

  const newRankings = await readDBFile(RANKINGS_DB_NAME)
  const oldRankings = await readDBFile(RANKINGS_OLD_DB_NAME)
  const rankingsChanges = await readDBFile(NEWS_DB_NAME)
  const date = new Date()

  for (const key in newRankings) {
    const categoryName = newRankings[key].categoryName
    const categoryId = newRankings[key].id
    const fightersArray = newRankings[key].fighters
    const fightersOldArray = oldRankings[key].fighters

    for (const key in fightersArray) {
      const intKey = parseInt(key)

      const currentFighter = fightersArray[key].id
      const fighterName = fightersArray[key].name

      if (currentFighter !== fightersOldArray[key]?.id) {
        const previousPosition = fightersOldArray.findIndex(({ id }) => {
          return id === currentFighter
        })

        const isSaved = rankingsChanges.find(
          (el) => el.fighter === currentFighter && el.currentPosition === intKey
        )

        if (!isSaved)
          rankingsChanges.unshift({
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

  return rankingsChanges
}
