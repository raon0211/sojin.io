export function isNot(items: string[]) {
  return new RegExp(`^(?!${items.map((x) => `${x}$`).join('|')}).*`)
}
