const cleanString = (text) => {
  return text.replace(/\t|\n|\s:/g, '').trim()
}

export default cleanString
