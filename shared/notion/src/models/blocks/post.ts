export type NotionPostBlock = NotionTextBlock

export interface NotionTextBlock {
  id: string
  type: 'header' | 'sub_header' | 'text'
  value: string | null
  parentId: string
}
