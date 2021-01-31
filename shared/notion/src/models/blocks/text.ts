import { NotionBaseBlock } from './base'

export interface NotionTextBlock extends NotionBaseBlock {
  type: 'header' | 'sub_header' | 'sub_sub_header' | 'text'
  value: NotionText[]
  parentId: string
}

export type NotionText =
  | NotionPlainText
  | NotionUnderlinedText
  | NotionCodeText
  | NotionEquationText
  | NotionLinkText
  | NotionBoldText
  | NotionItalicText

export interface NotionPlainText {
  type: 'plain'
  value: string
}

export interface NotionUnderlinedText {
  type: 'underline'
  value: string
}

export interface NotionCodeText {
  type: 'code'
  value: string
}

export interface NotionEquationText {
  type: 'equation'
  value: string
}

export interface NotionLinkText {
  type: 'link'
  href: string
  value: string
}

export interface NotionBoldText {
  type: 'bold'
  value: string
}

export interface NotionItalicText {
  type: 'italic'
  value: string
}
