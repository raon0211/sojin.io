export function ensureNotEmpty<T>(
  name: string,
  value: T | null | undefined
): T {
  if (value == null) {
    throw new Error(`Expected ${name} not to be empty, but received '${value}'`)
  }

  return value
}
