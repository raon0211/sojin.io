import { ensureNotEmpty } from '@sojin/utils'

export const BLOG_INDEX_ID = ensureNotEmpty(
  'BLOG_INDEX_ID',
  process.env.BLOG_INDEX_ID
)
