import path from 'node:path'
import { cleanString, camelCaseString } from '../utils/stringFormatters.js'
import { logInfo, logSuccess } from '../utils/log.js'
import { readDBFile, writeDBFile } from '../utils/db.js'
import checkFileExists from '../utils/checkFileExists.js'
import saveImage from '../utils/saveImage.js'
import scrape from '../utils/scrape.js'
import { FIGHTERS_DB_NAME } from '../constants/index.js'

const ATHLETE_BASE_URL = 'https://www.ufc.com/athlete/'
const BASE_IMAGE_FOLDER = 'public'
const FIGHTERS_IMAGE_FOLDER = 'fighters'

const FIGHTER_DATA = await readDBFile(FIGHTERS_DB_NAME)

const SELECTORS = {
  bio_field: '.c-bio__label',
  category: '.hero-profile__division-title',
  image: '.hero-profile__image',
  name: '.hero-profile__name',
  nickname: '.hero-profile__nickname',
  record: '.hero-profile__division-body',
}

const scrapeFighter = async (id) => {
  const url = ATHLETE_BASE_URL + id

  logInfo(`Scraping ${id} web page`)

  const $ = await scrape(url)

  const name = $.querySelector(SELECTORS.name).textContent
  const nickname = $.querySelector(SELECTORS.nickname)
    ? $.querySelector(SELECTORS.nickname).textContent.replaceAll('"', '')
    : ''
  const imgUrl = $.querySelector(SELECTORS.image).getAttribute('src')
  const rawRecord = $.querySelector(SELECTORS.record).textContent
  const [wins, losses, draws] = rawRecord.split(' ')[0].split('-')
  const category = $.querySelector(SELECTORS.category).textContent

  const bioFieldsData = {}
  const $bioFields = $.querySelectorAll(SELECTORS.bio_field)

  $bioFields.forEach(($el) => {
    const text_label = $el.textContent.toLowerCase().replace(' ', '_')
    const text_content = cleanString($el.nextElementSibling.textContent)
    bioFieldsData[camelCaseString(text_label)] = text_content
  })

  // For new fighters in our ranking, FIGHTER_DATA[id] is undef
  // So we return a void string as imgUrl
  const oldImgUrl = FIGHTER_DATA[id]?.imgUrl ?? ''

  if (imgUrl !== oldImgUrl)
    await saveImage({
      baseFolder: BASE_IMAGE_FOLDER,
      fileName: id,
      folder: FIGHTERS_IMAGE_FOLDER,
      url: imgUrl,
    })

  FIGHTER_DATA[id] = { category, draws, imgUrl, losses, name, nickname, wins, ...bioFieldsData }
  await writeDBFile(FIGHTERS_DB_NAME, FIGHTER_DATA)
  logSuccess(`${FIGHTERS_DB_NAME} updated`)
}

export default scrapeFighter
