import { isNotNil } from '@sojin/utils'
import { NotionText } from '../../models/blocks/text'
import { NotionPropertyResponse } from '../../remotes/types/block'

export function parseNotionText(items: NotionPropertyResponse): NotionText[] {
  return items
    .map((item): NotionText | null => {
      const [text, tag] = item

      if (tag == null) {
        return {
          type: 'plain',
          value: text,
        }
      }

      const [type, value] = tag[0]

      switch (type) {
        case 'c': {
          return {
            type: 'code',
            value: text,
          }
        }
        case 'e': {
          return {
            type: 'equation',
            value,
          }
        }
        case 'i': {
          return {
            type: 'italic',
            value: text,
          }
        }
        case 'b': {
          return {
            type: 'bold',
            value: text,
          }
        }
        case 'a': {
          return {
            type: 'link',
            href: value,
            value: text,
          }
        }
        case '_': {
          return {
            type: 'equation',
            value: text,
          }
        }
        default:
          return null
      }
    })
    .filter(isNotNil)
}
