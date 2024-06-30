import { getAndSaveRankings } from './services/getAndSaveRankings.js'

const runRankingsEntrypoint = async () => {
  console.log('Starting scraping process from runRankingsEntrypoint...')
  await getAndSaveRankings()
}

export default runRankingsEntrypoint
