import { NotionBaseBlock } from './base'

export interface NotionCodeBlock extends NotionBaseBlock {
  type: 'code'
  code: string
  language: string
}
