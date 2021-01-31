import { NotionBaseBlock } from './base'
import { NotionBlock } from './block'

export interface NotionCollectionViewBlock extends NotionBaseBlock {
  type: 'collection_view'
  collectionId: string
  viewIds: string[]
}

export function isCollectionViewBlock(
  block: NotionBlock
): block is NotionCollectionViewBlock {
  return block.type === 'collection_view'
}
