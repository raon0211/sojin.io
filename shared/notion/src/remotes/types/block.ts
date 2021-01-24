import { NotionBlock } from '../../models'

export type NotionBlockResponse =
  | NotionPageBlockResponse
  | NotionCollectionViewBlockResponse

export interface NotionPageBlockResponse {
  type: 'page'
  id: string
  parent_id: string
  properties?: { title: string[][] }
}

export interface NotionCollectionViewBlockResponse {
  type: 'collection_view'
  collection_id: string
  view_ids: string[]
  parent_id: string
}

export function parseNotionBlockResponse(
  id: string,
  block: NotionBlockResponse
): NotionBlock | null {
  switch (block.type) {
    case 'page':
      return {
        id,
        type: 'page',
        parentId: block.parent_id,
        title: block.properties?.title[0][0] ?? null,
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
