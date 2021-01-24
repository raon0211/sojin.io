import { NotionBlock } from './block'

export interface NotionCollectionViewBlock {
  id: string
  type: 'collection_view'
  collectionId: string
  viewIds: string[]
  parentId: string
}

export function isCollectionViewBlock(
  block: NotionBlock
): block is NotionCollectionViewBlock {
  return block.type === 'collection_view'
}
