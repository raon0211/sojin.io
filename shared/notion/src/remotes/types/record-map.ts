import { NotionBlockResponse } from './block'
import { NotionCollectionResponse } from './collection'

export interface NotionRecordMapResponse {
  collection?: NotionCollectionResponse
  block: Record<string, { value: NotionBlockResponse }>
}
