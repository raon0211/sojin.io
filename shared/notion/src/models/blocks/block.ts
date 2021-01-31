import { NotionCodeBlock } from './code'
import { NotionCollectionViewBlock } from './collection'
import { NotionCompletionBlock } from './completion'
import { NotionEquationBlock } from './equation'
import { NotionListBlock, NotionListItemBlock } from './list'
import { NotionPageBlock } from './page'
import { NotionTextBlock } from './text'

export type NotionBlock =
  | NotionCollectionViewBlock
  | NotionPageBlock
  | NotionTextBlock
  | NotionEquationBlock
  | NotionCodeBlock
  | NotionListBlock
  | NotionListItemBlock
  | NotionCompletionBlock
