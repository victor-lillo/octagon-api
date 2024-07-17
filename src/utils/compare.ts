export function ascCompare(prop: string) {
  return function (a: { [x: string]: string }, b: { [x: string]: string }) {
    return a[prop].localeCompare(b[prop])
  }
}

export function descCompare(prop: string) {
  return function (a: { [x: string]: string }, b: { [x: string]: string }) {
    return b[prop].localeCompare(a[prop])
  }
}
