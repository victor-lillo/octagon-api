import path from 'node:path'
import { logInfo, logSuccess } from './lib/log.js'
import { readDBFile } from './lib/db.js'
import checkFileExists from './lib/checkFileExists.js'
import getImageSrc from './lib/getImageSrc.js'
import saveImage from './lib/saveImage.js'
import timeFormatter from './lib/timeFormatter.js'

const BASE_IMAGE_FOLDER = 'public'
const FIGHTERS_IMAGE_FOLDER = 'fighters'
const REQUEST_DELAY = 3000
const SELECTORS = {
  image: '.hero-profile__image',
}

async function getFigtherImages() {
  const start = performance.now()
  const FIGHTERS_RAW = await readDBFile('rankings')

  for (const { fighters } of FIGHTERS_RAW) {
    for (const { id, url } of fighters) {
      logInfo(`Checking ${id} image...`)
      const img_path = path.join(process.cwd(), 'public', FIGHTERS_IMAGE_FOLDER, id + '.webp')

      if (await checkFileExists(img_path)) {
        console.log('This image already exists, skipping\n')
        break
      }

      const imgUrl = await getImageSrc({ id, url, selector: SELECTORS.image })

      await saveImage({
        baseFolder: BASE_IMAGE_FOLDER,
        fileName: id,
        folder: FIGHTERS_IMAGE_FOLDER,
        url: imgUrl,
      })

      console.log(`Waiting ${REQUEST_DELAY / 1000} s...\n`)
      await sleep(REQUEST_DELAY)
    }
  }

  const end = performance.now()
  const time = timeFormatter(end - start)
  logSuccess(`Task finished in ${time} ms`)
}

await getFigtherImages()
