import { cleanString, camelCaseString } from './string_modifiers.js'
import scrape from './scrape.js'

const getFighterInfo = async ({ id, selectors, url }) => {
  const {
    image,
    record,
    category: category_,
    age: age_,
    bio_field,
    nickname: nickname_,
  } = selectors

  console.log(`Scraping ${id} web page`)
  const $ = await scrape(url)
  const imgUrl = $.querySelector(image).getAttribute('src')
  const raw_record = $.querySelector(record).textContent
  const [wins, losses, draws] = raw_record.split(' ')[0].split('-')
  const category = $.querySelector(category_).textContent
  const nickname = $.querySelector(nickname_)
    ? $.querySelector(nickname_).textContent.replaceAll('"', '')
    : ''
  const age = cleanString($.querySelector(age_).textContent)

  const obj = {}
  const bio_fields = $.querySelectorAll(bio_field)

  bio_fields.forEach(($el) => {
    const text_label = $el.textContent.toLowerCase().replace(' ', '_')
    const text_content = $el.nextElementSibling.textContent
    obj[camelCaseString(text_label)] = text_content
  })

  return {
    ...obj,
    age,
    category,
    draws,
    imgUrl,
    losses,
    nickname,
    wins,
  }
}

export default getFighterInfo
