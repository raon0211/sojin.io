type ObjectMap<T> = { [key: string]: T }

export function createObjectByKey<T>(
  array: T[],
  keyExtractor: (value: T) => string
): ObjectMap<T | undefined> {
  return array.reduce((acc: ObjectMap<T>, curr) => {
    return {
      ...acc,
      [keyExtractor(curr)]: curr,
    }
  }, {})
}
