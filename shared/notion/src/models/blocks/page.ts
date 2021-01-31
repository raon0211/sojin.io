import { NotionCollectionSchemaType } from '../../remotes/types/collection'
import { NotionBaseBlock } from './base'
import { NotionBlock } from './block'

export interface NotionPageBlock extends NotionBaseBlock {
  type: 'page'
  parentId: string
  title: string | null
  properties: { [propertyName: string]: NotionPageBlockProperty | undefined }
}

export type NotionPageBlockProperty =
  | NotionPageBlockCheckboxProperty
  | NotionPageBlockTextProperty
  | NotionPageBlockTitleProperty
  | NotionPageBlockDateProperty

export interface NotionPageBlockCheckboxProperty {
  type: NotionCollectionSchemaType.checkbox
  name: string
  id: string
  value: boolean
}

export interface NotionPageBlockTextProperty {
  type: NotionCollectionSchemaType.text
  name: string
  id: string
  value: string | null
}

export interface NotionPageBlockTitleProperty {
  type: NotionCollectionSchemaType.title
  name: string
  id: string
  value: string | null
}

export interface NotionPageBlockDateProperty {
  type: NotionCollectionSchemaType.date
  name: string
  id: string
  value: string
}

export function isPageBlock(block: NotionBlock): block is NotionPageBlock {
  return block.type === 'page'
}
