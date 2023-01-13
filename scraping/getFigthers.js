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
  bio_field: '.c-bio__label',
  category: '.hero-profile__division-title',
  image: '.hero-profile__image',
  nickname: '.hero-profile__nickname',
  age: '.field--name-age',
  record: '.hero-profile__division-body',
}

async function getFigthers() {
  const start = performance.now()
  const ranking_data = await readDBFile('rankings')
  const fighter_data = await readDBFile('fighters')

  for (const { fighters } of ranking_data) {
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

      if (await checkFileExists(img_path)) logSuccess('This image already exists, skipping')
      else
        await saveImage({
          baseFolder: BASE_IMAGE_FOLDER,
          fileName: id,
          folder: FIGHTERS_IMAGE_FOLDER,
          url: imgUrl,
        })

      fighter_data[id] = { ...dataObj }

      await writeDBFile(FIGHTERS_DB_NAME, fighter_data)
      logSuccess(`${FIGHTERS_DB_NAME}.json updated`)
      console.log(`Waiting ${timeFormatter(REQUEST_DELAY)}\n`)
      await sleep(REQUEST_DELAY)
    }
  }

  const end = performance.now()
  const time = timeFormatter(end - start)
  logSuccess(`Task finished in ${time}`)
}

await getFigthers()
