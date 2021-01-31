export type NotionBlockResponse =
  | NotionPageBlockResponse
  | NotionCollectionViewBlockResponse
  | NotionTextBlockResponse
  | NotionEquationBlockResponse
  | NotionCodeBlockResponse
  | NotionBulletedItemResponse
  | NotionNumberedItemResponse

interface NotionBaseBlockResponse {
  id: string
  content?: string[]
  properties?: NotionPageProperties
  parent_id: string
}

// FIXME: Fix `any` typing
export type NotionPropertyResponse = [string, any][]

interface NotionPageProperties {
  [propertyName: string]: NotionPropertyResponse | undefined
}

export interface NotionPageBlockResponse extends NotionBaseBlockResponse {
  type: 'page'
  content: string[]
}

export interface NotionCollectionViewBlockResponse
  extends NotionBaseBlockResponse {
  type: 'collection_view'
  collection_id: string
  view_ids: string[]
}

export interface NotionTextBlockResponse extends NotionBaseBlockResponse {
  type: 'header' | 'sub_header' | 'sub_sub_header' | 'text'
}

export interface NotionEquationBlockResponse extends NotionBaseBlockResponse {
  type: 'equation'
}

export interface NotionCodeBlockResponse extends NotionBaseBlockResponse {
  type: 'code'
}

export interface NotionNumberedItemResponse extends NotionBaseBlockResponse {
  type: 'numbered_list'
}

export interface NotionBulletedItemResponse extends NotionBaseBlockResponse {
  type: 'bulleted_list'
}
