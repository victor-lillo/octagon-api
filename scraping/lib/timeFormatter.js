// Time: ms
const timeFormatter = (time) => {
  if (time > 1000) return (time / 1000).toFixed(2)
  return time.toFixed(2)
}

export default timeFormatter
