import { logSuccess } from './log.js'
import { readDBFile, writeDBFile } from './db.js'

const STORED_CHANGES_NUM = 10
const NEWS_DB_NAME = 'news'

const oldRanking = await readDBFile('rankings-old')
const newRanking = await readDBFile('rankings')
const rankingChanges = await readDBFile('news')
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

      if (currentFighter !== fightersOldArray[key].id) {
        const previousPosition = fightersOldArray.findIndex(({ id }) => id === currentFighter)

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
            previousPosition,
            date,
          })
      }
    }
  }
  const limitedRankingChanges = rankingChanges.slice(0, STORED_CHANGES_NUM - 1)
  await writeDBFile(NEWS_DB_NAME, limitedRankingChanges)
  logSuccess('Ranking changes saved')
}
