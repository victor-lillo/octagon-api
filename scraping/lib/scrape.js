import { parse } from 'node-html-parser'

const scrape = async (url) => {
  const res = await fetch(url)
  const html = await res.text()
  return parse(html)
}

export default scrape
