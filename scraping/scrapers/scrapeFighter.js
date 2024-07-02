import { camelCaseString, cleanString } from '../utils/stringFormatters.js'
import { logInfo } from '../utils/log.js'
import { scrape } from '../utils/scrape.js'

const ATHLETE_BASE_URL = 'https://www.ufc.com/athlete/'

const getAthleteUrl = (id) => ATHLETE_BASE_URL + id

const SELECTORS = {
  bio_field: '.c-bio__label',
  category: '.hero-profile__division-title',
  image: '.hero-profile__image',
  name: '.hero-profile__name',
  nickname: '.hero-profile__nickname',
  record: '.hero-profile__division-body',
}

export const scrapeFighter = async (id) => {
  logInfo(`Scraping ${id} web page`)

  const url = getAthleteUrl(id)

  const $ = await scrape(url)

  const name = $.querySelector(SELECTORS.name).textContent
  const nickname = $.querySelector(SELECTORS.nickname)
    ? $.querySelector(SELECTORS.nickname).textContent.replaceAll('"', '')
    : ''
  const imgUrl = $.querySelector(SELECTORS.image).getAttribute('src')
  const rawRecord = $.querySelector(SELECTORS.record).textContent
  const [wins, losses, draws] = rawRecord.split(' ')[0].split('-')
  const category = $.querySelector(SELECTORS.category).textContent

  const $bioFields = $.querySelectorAll(SELECTORS.bio_field)

  const bioFieldsData = {}
  $bioFields.forEach(($el) => {
    const text_label = $el.textContent.toLowerCase().replace(' ', '_')
    const text_content = cleanString($el.nextElementSibling.textContent)
    bioFieldsData[camelCaseString(text_label)] = text_content
  })

  const data = { category, draws, imgUrl, losses, name, nickname, wins, ...bioFieldsData }
  return data
}
