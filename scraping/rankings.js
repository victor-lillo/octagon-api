import * as cheerio from 'cheerio'

const RANKINGS_URL = 'https://www.ufc.com/rankings'

async function getRankings() {
  const res = await fetch(RANKINGS_URL)
  const html = await res.text()
  const $ = cheerio.load(html)

  const $cards = $('.a-carousel-card')

  console.log($cards.length)
  //   $cards.each((index, el) => {
  //     const $el = $(el)
  //   })
}

const run = async () => {
  await getRankings()
}

run()
