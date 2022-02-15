export function toArray(target: string | Array<string>): Array<string> {
  const array = []
  if (typeof target === 'string') {
    array.push(target)
    return array
  }
  if (Array.isArray(target)) {
    return target
  }
}
