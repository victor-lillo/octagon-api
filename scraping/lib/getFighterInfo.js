import scrape from './scrape.js'

const getFighterInfo = async ({ id, selectors, url }) => {
  const { image, record, categoryS, ageS } = selectors
  console.log(`Scraping ${id} web page`)
  const $ = await scrape(url)
  const imgUrl = $.querySelector(image).getAttribute('src')
  const rawRecord = $.querySelector(record).textContent
  const [wins, losses, draws] = rawRecord.split(' ')[0].split('-')
  const category = $.querySelector(categoryS).textContent
  const age = $.querySelector(ageS).textContent
  // TODO
  // const fightingStyle = $.querySelector(record).textContent
  // const reach = $.querySelector(record).textContent
  // const hometown = $.querySelector(record).textContent
  // const debut = $.querySelector(record).textContent

  return {
    imgUrl,
    wins,
    losses,
    draws,
    category,
    age,
  }
}

export default getFighterInfo
