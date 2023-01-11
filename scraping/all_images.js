import getFighterImage from './fighter_image.js'
import { readDBFile } from './lib/db.js'
import { logInfo } from './lib/log.js'

async function getAllImages() {
  const FIGHTERS_RAW = await readDBFile('rankings')

  for (const { fighters } of FIGHTERS_RAW) {
    for (const { id, url } of fighters) {
      logInfo(`- Vamos a sacar la imagen de ${id}`)
      await getFighterImage(id, url)
    }
  }
}

await getAllImages()
