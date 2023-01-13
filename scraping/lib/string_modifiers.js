export const cleanString = (text) => {
  return text.replace(/\t|\n|\s:/g, '').trim()
}

export const standarizeString = (str) => {
  const withOutAccents = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const regex = /[^a-zA-Z0-9-]/g
  return withOutAccents.replace(regex, '')
}

// This regex returns the replaced character and the next one that fits our regex
export const camelCaseString = (str) => {
  const replacer = (match, chr) => {
    return chr.toUpperCase()
  }
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, replacer)
}
