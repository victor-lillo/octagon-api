import saveImage from './lib/saveImage.js'
import scrape from './lib/scrape.js'

const BASE_FIGHTER_URL = 'https://www.ufc.com/athlete'
const FIGHTER = 'islam-makhachev'
const FIGHTERS_IMAGE_FOLDER = 'fighters'

const SELECTORS = {
  image: '.hero-profile__image',
}

async function getFighterImage() {
  const $ = await scrape(`${BASE_FIGHTER_URL}/${FIGHTER}`)
  const imgSrc = $.querySelector(SELECTORS.image).getAttribute('src')
  await saveImage({ url: imgSrc, folder: FIGHTERS_IMAGE_FOLDER, fileName: FIGHTER })
}

await getFighterImage()
