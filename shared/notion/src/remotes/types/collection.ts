export enum NotionCollectionSchemaType {
  text = 'text',
  checkbox = 'checkbox',
  date = 'date',
  title = 'title',
}

export interface NotionCollectionResponse {
  [collectionId: string]: NotionCollectionItemResponse | undefined
}

export interface NotionCollectionItemResponse {
  value: {
    schema: NotionCollectionItemSchema
  }
}

export interface NotionCollectionItemSchema {
  [schemaId: string]:
    | { name: string; type: NotionCollectionSchemaType }
    | undefined
}
