export function removeArrayElementByKey({
  array,
  keyToRemove,
  keyValue,
}: {
  array: Record<string, string>[]
  keyToRemove: string
  keyValue: string
}) {
  const index = array.findIndex((x) => x[keyToRemove] === keyValue)
  const copy = array
  if (index !== -1) {
    copy.splice(index, 1)
  }
  return copy
}
