import { isNotNil } from '@sojin/utils'
import { isPageBlock, NotionCollectionViewBlock } from '../models'
import { callNotionFunction } from './client'
import { parseNotionBlockResponse } from './types/block'
import { NotionRecordMapResponse } from './types/record-map'

interface NotionQueryCollectionResponse {
  recordMap: NotionRecordMapResponse
  result: {
    aggregationResults: unknown[]
    blockIds: string[]
    total: number
    type: string
  }
}

export async function fetchNotionCollection(
  collectionBlock: NotionCollectionViewBlock
) {
  const response = await callNotionFunction<NotionQueryCollectionResponse>(
    'queryCollection',
    {
      body: {
        collectionId: collectionBlock.collectionId,
        collectionViewId: collectionBlock.viewIds[0],
        loader: {
          // TODO: Find out notion's pagination handling method
          limit: 999,
          loadContentCover: true,
          type: 'table',
          userTimeZone: 'Asia/Seoul',
        },
        query: {
          aggregations: [
            {
              aggregator: 'count',
              property: 'title',
            },
          ],
        },
      },
    }
  )

  const blocks = response.result.blockIds
    .map((blockId) => {
      return parseNotionBlockResponse(
        blockId,
        response.recordMap.block[blockId].value
      )
    })
    .filter(isNotNil)
    .filter(isPageBlock)

  return { blocks }
}
