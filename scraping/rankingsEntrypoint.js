import { compareAndSaveRankings } from './services/compareAndSaveRankings.js'
import { getAndSaveRankings } from './services/getAndSaveRankings.js'

const runRankingsEntrypoint = async () => {
  console.log('Starting scraping process from runRankingsEntrypoint...')
  await getAndSaveRankings()

  console.log('Starting compareAndSaveRankings...')
  await compareAndSaveRankings()
}

runRankingsEntrypoint()
