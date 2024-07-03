import { compareAndSaveRankings } from './services/compareAndSaveRankings.js'
import { getAndSaveRankings } from './services/getAndSaveRankings.js'

const runRankingsEntrypoint = async () => {
  console.log('Starting "runRankingsEntrypoint"...\n')
  await getAndSaveRankings()
  await compareAndSaveRankings()
}

runRankingsEntrypoint()
