export function toArray(target: string | Array<string>): Array<string> {
  const array: Array<string> = []
  if (typeof target === 'string') {
    array.push(target)
    return array
  }
  if (Array.isArray(target)) {
    return target
  }

  return array
}
