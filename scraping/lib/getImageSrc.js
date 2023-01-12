import scrape from './scrape.js'

const getImageSrc = async ({ id, selector, url }) => {
  console.log(`Scraping ${id} web page`)
  const $ = await scrape(url)
  return $.querySelector(selector).getAttribute('src')
}

export default getImageSrc
