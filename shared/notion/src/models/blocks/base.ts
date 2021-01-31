import { NotionBlock } from './block'

export interface NotionBaseBlock {
  id: string
  children: NotionBlock[] | null
  parentId: string
}
