import { getAndSaveFighters } from './services/getAndSaveFighters.js'
import { logSuccess } from './utils/log.js'

const runFightersEntrypoint = async () => {
  console.log('Starting "runFightersEntrypoint"...\n')

  await getAndSaveFighters()
  logSuccess('Scraper finished')
}

runFightersEntrypoint()
