import { NotionBlock } from './block'

export interface NotionPageBlock {
  id: string
  type: 'page'
  parentId: string
  title: string | null
}

export function isPageBlock(block: NotionBlock): block is NotionPageBlock {
  return block.type === 'page'
}
