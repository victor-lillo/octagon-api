export function ascCompare(prop: string) {
  return function (a: Record<string, string>, b: Record<string, string>) {
    return a[prop].localeCompare(b[prop])
  }
}

export function descCompare(prop: string) {
  return function (a: Record<string, string>, b: Record<string, string>) {
    return b[prop].localeCompare(a[prop])
  }
}
