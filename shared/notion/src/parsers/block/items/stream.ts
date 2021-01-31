import { NotionBlock } from '../../../models/blocks/block'
import { NotionBlockResponse } from '../../../remotes/types/block'
import { parseNotionBlockResponse } from './item'

export function* createBlockStream(
  blockIds: string[],
  blockById: Record<string, { value: NotionBlockResponse }>
): Generator<NotionBlock, void, unknown> {
  for (const blockId of blockIds) {
    const block = parseNotionBlockResponse({
      id: blockId,
      blockById,
    })

    if (block != null) {
      yield block
    }
  }

  /**
   * In order to make aggregators complete safely,
   * we append an artibrary completion block at the end of the stream
   * @see ./list-aggregator.ts
   */
  yield {
    type: 'completion',
    id: '',
    parentId: '',
    children: null,
  }
}
