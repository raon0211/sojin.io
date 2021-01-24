export const BLOG_INDEX_ID = (() => {
  if (process.env.BLOG_INDEX_ID != null) {
    return process.env.BLOG_INDEX_ID
  }

  throw new Error(`Environment variable 'BLOG_INDEX_ID' is not set.`)
})()
