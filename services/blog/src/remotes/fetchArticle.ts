import { fetchNotionPageBlocks } from '@sojin/notion'
import { fetchArticles } from './fetchArticles'

export async function fetchArticleInfo(slug: string) {
  const articles = await fetchArticles()
  const articleMatch = articles.find((article) => {
    return article.slug === slug || article.id === slug
  })

  if (articleMatch == null) {
    return null
  }

  const blocks = await fetchNotionPageBlocks({
    pageId: articleMatch.id,
  })

  return { article: articleMatch, blocks }
}
