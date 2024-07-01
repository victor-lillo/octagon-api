import { getAndSaveRankings } from './getAndSaveRankings.js'
import { logSuccess } from '../utils/log.js'
import { writeDBFile } from '../utils/db.js'
import { NEWS_DB_NAME } from '../constants/names.js'
import { STORED_CHANGES_NUM } from '../constants/config.js'

export const compareAndSaveRankings = async () => {
  const rankingChanges = await getAndSaveRankings()
  const limitedRankingChanges = rankingChanges.slice(0, STORED_CHANGES_NUM)
  await writeDBFile(NEWS_DB_NAME, limitedRankingChanges)

  logSuccess('Ranking changes saved\n')
}
