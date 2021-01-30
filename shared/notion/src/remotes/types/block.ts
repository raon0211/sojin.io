import { createObjectByKey, isNotNil } from '@sojin/utils'
import {
  NotionBlock,
  NotionPageBlockProperty,
  NotionPostBlock,
  parseNotionPageBlockProperty,
  parsePropertyValueOfType,
} from '../../models'
import {
  NotionCollectionItemSchema,
  NotionCollectionSchemaType,
} from './collection'

export type NotionBlockResponse =
  | NotionPageBlockResponse
  | NotionCollectionViewBlockResponse
  | NotionTextBlockResponse

interface NotionPageProperties {
  [propertyName: string]: string[][] | undefined
}

export interface NotionPageBlockResponse {
  type: 'page'
  id: string
  parent_id: string
  content: string[]
  properties?: NotionPageProperties
}

export interface NotionCollectionViewBlockResponse {
  type: 'collection_view'
  collection_id: string
  view_ids: string[]
  parent_id: string
}

export interface NotionTextBlockResponse {
  type: 'header' | 'sub_header' | 'text'
  parent_id: string
  properties?: NotionPageProperties
}

export function parseNotionBlockResponse({
  id,
  block,
  schema,
}: {
  id: string
  block: NotionBlockResponse
  schema?: NotionCollectionItemSchema
}): NotionBlock | null {
  switch (block.type) {
    case 'page': {
      const properties = parsePageProperties(block.properties, schema)

      return {
        id,
        type: 'page',
        parentId: block.parent_id,
        title: parsePropertyValueOfType(
          properties.Page,
          NotionCollectionSchemaType.title
        ),
        properties,
      }
    }
    case 'collection_view':
      return {
        id,
        type: 'collection_view',
        collectionId: block.collection_id,
        viewIds: block.view_ids,
        parentId: block.parent_id,
      }
    case 'header':
    case 'sub_header':
    case 'text': {
      const postBlock: NotionPostBlock = {
        id,
        type: block.type,
        value: block.properties?.title?.[0][0] ?? null,
        parentId: block.parent_id,
      }

      return postBlock
    }
    default:
      return null
  }
}

function parsePageProperties(
  properties: NotionPageBlockResponse['properties'],
  schema: NotionCollectionItemSchema | undefined
) {
  if (properties == null || schema == null) {
    return {}
  }

  const items = Object.entries(properties)
    .map(([key, value]): NotionPageBlockProperty | null => {
      return parseNotionPageBlockProperty(schema, key, value)
    })
    .filter(isNotNil)

  return createObjectByKey(items, (x) => x.name)
}
