import { NotionBaseBlock } from './base'
import { NotionText } from './text'

export interface NotionListBlock extends NotionBaseBlock {
  type: 'list'
  orderType: 'ordered' | 'unordered'
}

export interface NotionListItemBlock extends NotionBaseBlock {
  type: 'list_item'
  orderType: 'ordered' | 'unordered'
  value: NotionText[]
}
