import { NotionCollectionViewBlock } from './collection'
import { NotionPageBlock } from './page'
import { NotionPostBlock } from './post'

export type NotionBlock =
  | NotionCollectionViewBlock
  | NotionPageBlock
  | NotionPostBlock
