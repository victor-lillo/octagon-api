import { cleanString, camelCaseString } from './string_modifiers.js'
import scrape from './scrape.js'

const getFighterInfo = async ({ id, selectors, url }) => {
  const {
    bio_field,
    category: category_,
    image,
    name: name_,
    nickname: nickname_,
    record,
  } = selectors

  console.log(`Scraping ${id} web page`)
  const $ = await scrape(url)
  const name = $.querySelector(name_).textContent
  const nickname = $.querySelector(nickname_)
    ? $.querySelector(nickname_).textContent.replaceAll('"', '')
    : ''
  const imgUrl = $.querySelector(image).getAttribute('src')
  const raw_record = $.querySelector(record).textContent
  const [wins, losses, draws] = raw_record.split(' ')[0].split('-')
  const category = $.querySelector(category_).textContent

  const obj = {}
  const bio_fields = $.querySelectorAll(bio_field)
  bio_fields.forEach(($el) => {
    const text_label = $el.textContent.toLowerCase().replace(' ', '_')
    const text_content = cleanString($el.nextElementSibling.textContent)
    obj[camelCaseString(text_label)] = text_content
  })

  return {
    name,
    nickname,
    age,
    category,
    wins,
    draws,
    losses,
    imgUrl,
    ...obj,
  }
}

export default getFighterInfo
