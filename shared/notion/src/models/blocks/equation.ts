import { NotionBaseBlock } from './base'

export interface NotionEquationBlock extends NotionBaseBlock {
  type: 'equation'
  equation: string
  parentId: string
}
