import { createObjectByKey, isNotNil } from '@sojin/utils'
import {
  NotionBlock,
  NotionPageBlockProperty,
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

export interface NotionPageBlockResponse {
  type: 'page'
  id: string
  parent_id: string
  properties?: {
    [propertyName: string]: string[][] | undefined
  }
}

export interface NotionCollectionViewBlockResponse {
  type: 'collection_view'
  collection_id: string
  view_ids: string[]
  parent_id: string
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
