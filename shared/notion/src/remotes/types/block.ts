import { NotionBlock } from '../../models'

export type NotionBlockResponse = NotionCollectionViewBlockResponse

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
