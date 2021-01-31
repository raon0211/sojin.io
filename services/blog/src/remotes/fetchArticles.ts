import {
  fetchNotionCollection,
  fetchNotionPageBlocks,
  isCollectionViewBlock,
  NotionCollectionSchemaType,
} from '@sojin/notion'
import { parsePropertyValueOfType } from '@sojin/notion/src/parsers/block/properties'
import { isNotNil } from '@sojin/utils'
import { BLOG_INDEX_ID } from 'constants/blog-index-id'
import { Article } from '../models/article'

export async function fetchArticles() {
  const blocks = await fetchNotionPageBlocks({
    pageId: BLOG_INDEX_ID,
  })

  const collectionView = blocks.find(isCollectionViewBlock)

  if (collectionView == null) {
    throw new Error('There is no collection_view stored in notion.')
  }

  const collection = await fetchNotionCollection(collectionView)

  return collection.blocks
    .map((block): Article | null => {
      if (block.title == null) {
        return null
      }

      const description = parsePropertyValueOfType(
        block.properties.description,
        NotionCollectionSchemaType.text
      )
      const publishedAt = parsePropertyValueOfType(
        block.properties.date,
        NotionCollectionSchemaType.date
      )

      return {
        id: block.id,
        title: block.title,
        description: [publishedAt, description].filter(isNotNil).join(' · '),
        slug: parsePropertyValueOfType(
          block.properties.slug,
          NotionCollectionSchemaType.text
        ),
        publishedAt,
        isPublished:
          parsePropertyValueOfType(
            block.properties.published,
            NotionCollectionSchemaType.checkbox
          ) ?? false,
      }
    })
    .filter(isNotNil)
}
