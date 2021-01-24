import {
  fetchNotionCollection,
  fetchNotionPage,
  isCollectionViewBlock,
} from '@sojin/notion'
import { isNotNil } from '@sojin/utils'
import { BLOG_INDEX_ID } from 'constants/blog-index-id'
import { Article } from '../models/article'

export async function fetchArticles() {
  const page = await fetchNotionPage({
    pageId: BLOG_INDEX_ID,
  })

  const collectionView = page.blocks.find(isCollectionViewBlock)

  if (collectionView == null) {
    throw new Error('There is no collection_view stored in notion.')
  }

  const collection = await fetchNotionCollection(collectionView)

  return collection.blocks
    .map((block): Article | null => {
      if (block.title == null) {
        return null
      }

      return {
        title: block.title,
      }
    })
    .filter(isNotNil)
}
