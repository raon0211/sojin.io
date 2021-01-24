export type NotionBlock = NotionCollectionViewBlock

export interface NotionCollectionViewBlock {
  id: string
  type: 'collection_view'
  collectionId: string
  viewIds: string[]
  parentId: string
}
