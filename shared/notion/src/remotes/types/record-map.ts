import { NotionBlockResponse } from './block'

export interface NotionRecordMapResponse {
  block: Record<string, { value: NotionBlockResponse }>
}
