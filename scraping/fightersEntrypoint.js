import { getAndSaveFighters } from './services/getAndSaveFighters.js'

const runFightersEntrypoint = async () => {
  console.log('Starting "runFightersEntrypoint"...\n')

  await getAndSaveFighters()
}

runFightersEntrypoint()
