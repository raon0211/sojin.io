import { NotionBaseBlock } from '../../../models/blocks/base'
import { NotionBlock } from '../../../models/blocks/block'
import { NotionTextBlock } from '../../../models/blocks/text'
import { NotionBlockResponse } from '../../../remotes/types/block'
import {
  NotionCollectionItemSchema,
  NotionCollectionSchemaType,
} from '../../../remotes/types/collection'
import { parsePageProperties, parsePropertyValueOfType } from '../properties'
import { parseNotionText } from '../text'
import { parseContentsOfBlock } from './contents'

export function parseNotionBlockResponse({
  id,
  blockById,
  schema,
}: {
  id: string
  blockById: Record<string, { value: NotionBlockResponse }>
  schema?: NotionCollectionItemSchema
}): NotionBlock | null {
  const block = blockById[id]?.value

  // FIXME: Find out when block is null
  if (block == null) {
    return null
  }

  const base: NotionBaseBlock = {
    id,
    parentId: block.parent_id,
    children:
      block.content != null
        ? parseContentsOfBlock(block.content, blockById)
        : null,
  }

  switch (block.type) {
    case 'page': {
      const properties = parsePageProperties(block.properties, schema)

      return {
        ...base,
        type: 'page',
        title: parsePropertyValueOfType(
          properties.Page,
          NotionCollectionSchemaType.title
        ),
        properties,
      }
    }
    case 'collection_view':
      return {
        ...base,
        type: 'collection_view',
        collectionId: block.collection_id,
        viewIds: block.view_ids,
      }
    case 'header':
    case 'sub_header':
    case 'sub_sub_header':
    case 'text': {
      const postBlock: NotionTextBlock = {
        ...base,
        type: block.type,
        value: parseNotionText(block.properties?.title ?? []),
      }

      return postBlock
    }
    case 'equation': {
      const equation = block.properties?.title?.[0][0]

      if (equation == null) {
        throw new Error(
          `Incorrect equation received: equation is null, received ${JSON.stringify(
            block
          )}`
        )
      }

      return {
        ...base,
        type: 'equation',
        equation,
      }
    }
    case 'code': {
      const code = block.properties?.title?.[0][0]
      const language = block.properties?.language?.[0][0]

      if (code == null || language == null) {
        throw new Error(
          `Incorrect code received: code or language is null, received ${JSON.stringify(
            block
          )}`
        )
      }

      return {
        ...base,
        type: 'code',
        code,
        language,
      }
    }
    case 'bulleted_list':
    case 'numbered_list': {
      return {
        ...base,
        type: 'list_item',
        orderType: block.type === 'bulleted_list' ? 'unordered' : 'ordered',
        value: parseNotionText(block.properties?.title ?? []),
      }
    }
    default:
      return null
  }
}
