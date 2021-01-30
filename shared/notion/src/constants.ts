import { ensureNotEmpty } from '@sojin/utils'

export const NOTION_TOKEN = ensureNotEmpty(
  'NOTION_TOKEN',
  process.env.NOTION_TOKEN
)
