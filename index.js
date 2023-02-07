import { readDBFile } from './scraping/lib/db.js'

const oldRanking = await readDBFile('rankings-old')
const newRanking = await readDBFile('rankings')

const differencesArray = []

for (const key in newRanking) {
  const categoryName = newRanking[key].categoryName
  const categoryId = newRanking[key].id
  const fightersArray = newRanking[key].fighters
  const fightersOldArray = oldRanking[key].fighters

  for (const key in fightersArray) {
    const currentFighter = fightersArray[key].id

    if (currentFighter !== fightersOldArray[key].id) {
      const previousPosition = fightersOldArray.findIndex(({ id }) => id === currentFighter)

      differencesArray.push({
        [currentFighter]: {
          categoryId,
          currentPosition: key,
          previousPosition,
        },
      })
    }
  }
}
console.log(JSON.stringify(differencesArray, null, 2))
