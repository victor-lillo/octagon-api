import path from 'node:path'
import { logInfo, logSuccess } from './lib/log.js'
import { readDBFile, writeDBFile } from './lib/db.js'
import checkFileExists from './lib/checkFileExists.js'
import getFighterInfo from './lib/getFighterInfo.js'
import saveImage from './lib/saveImage.js'
import timeFormatter from './lib/timeFormatter.js'
const sleep = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds))
}

const BASE_IMAGE_FOLDER = 'public'
const FIGHTERS_IMAGE_FOLDER = 'fighters'
const FIGHTERS_DB_NAME = FIGHTERS_IMAGE_FOLDER
const REQUEST_DELAY = 1000 * 3
const SELECTORS = {
  image: '.hero-profile__image',
  record: '.hero-profile__division-body',
  categoryS: '.hero-profile__division-title',
  ageS: '.field--name-age',
}

async function getFigthers() {
  const start = performance.now()
  const fighters_raw = await readDBFile('rankings')

  const fighterData = {}

  for (const { fighters } of fighters_raw) {
    for (const { id, url } of fighters) {
      logInfo(`Checking ${id} image...`)

      const dataObj = await getFighterInfo({
        id,
        url,
        selectors: SELECTORS,
      })

      const img_path = path.join(
        process.cwd(),
        BASE_IMAGE_FOLDER,
        FIGHTERS_IMAGE_FOLDER,
        id + '.webp'
      )

      if (await checkFileExists(img_path)) console.log('This image already exists, skipping\n')
      else
        await saveImage({
          baseFolder: BASE_IMAGE_FOLDER,
          fileName: id,
          folder: FIGHTERS_IMAGE_FOLDER,
          url: imgUrl,
        })

      fighterData[id] = { ...dataObj }

      console.log(`Waiting ${timeFormatter(REQUEST_DELAY)}\n`)
      await sleep(REQUEST_DELAY)
    }

    logSuccess(`${FIGHTERS_DB_NAME}.json updated`)
    await writeDBFile(FIGHTERS_DB_NAME, fighterData)
  }

  const end = performance.now()
  const time = timeFormatter(end - start)
  logSuccess(`Task finished in ${time}`)
}

await getFigthers()
