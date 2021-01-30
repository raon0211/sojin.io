import {
  fetchNotionCollection,
  fetchNotionPage,
  isCollectionViewBlock,
  parsePropertyValueOfType,
  NotionCollectionSchemaType,
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
        id: block.id,
        title: block.title,
        description: parsePropertyValueOfType(
          block.properties.description,
          NotionCollectionSchemaType.text
        ),
        slug: parsePropertyValueOfType(
          block.properties.slug,
          NotionCollectionSchemaType.text
        ),
        publishedAt: parsePropertyValueOfType(
          block.properties.date,
          NotionCollectionSchemaType.date
        ),
        isPublished:
          parsePropertyValueOfType(
            block.properties.published,
            NotionCollectionSchemaType.checkbox
          ) ?? false,
      }
    })
    .filter(isNotNil)
}
