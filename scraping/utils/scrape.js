import { parse } from 'node-html-parser'
import axios from 'axios'

const scrape = async (url) => {
  try {
    // Usamos Axios porque fetch (node v 18.13) falla con 'fetch failed' al hacer un get a un dominio con response 301, no hace el redirect automáticamente.
    const res = await axios.get(url)
    const html = await res.data
    return parse(html)
    /*
    Con fetch sería así:
      const res = await fetch(url)
      const html = await res.text()
    */
  } catch (error) {
    console.log(error.message)
  }
}

export default scrape
