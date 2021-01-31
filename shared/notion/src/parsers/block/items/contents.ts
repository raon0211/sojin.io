import { NotionBlock } from '../../../models/blocks/block'
import { NotionListBlock } from '../../../models/blocks/list'
import { NotionBlockResponse } from '../../../remotes/types/block'
import { createListAggregator } from './list-aggregator'
import { createBlockStream } from './stream'

export function parseContentsOfBlock(
  blockIds: string[],
  blockById: Record<string, { value: NotionBlockResponse }>
): NotionBlock[] {
  const result: NotionBlock[] = []
  const aggregator = createListAggregator()

  for (const block of createBlockStream(blockIds, blockById)) {
    const aggregated = aggregator.add(block)

    if (aggregated != null) {
      const listBlock: NotionListBlock = {
        id: aggregated.items[0].id,
        orderType: aggregated.orderType,
        type: 'list',
        children: aggregated.items,
        parentId: aggregated.items[0].parentId,
      }

      result.push(listBlock)
    }

    if (block.type !== 'list_item') {
      result.push(block)
    }
  }

  return result
}
