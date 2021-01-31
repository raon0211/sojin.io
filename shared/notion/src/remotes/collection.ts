import { isNotNil } from '@sojin/utils'
import { isPageBlock, NotionCollectionViewBlock } from '../models'
import { parseNotionBlockResponse } from '../parsers/block/items'
import { callNotionFunction } from './client'
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
  const collectionId = collectionBlock.collectionId

  const response = await callNotionFunction<NotionQueryCollectionResponse>(
    'queryCollection',
    {
      body: {
        collectionId: collectionId,
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

  const collection = response.recordMap.collection?.[collectionId]

  if (collection == null) {
    throw new Error(
      `Expected collection for ID ${collectionId} not to be empty, but received '${collection}'`
    )
  }

  const blocks = response.result.blockIds
    .map((blockId) => {
      return parseNotionBlockResponse({
        id: blockId,
        blockById: response.recordMap.block,
        schema: collection.value.schema,
      })
    })
    .filter(isNotNil)
    .filter(isPageBlock)

  return { blocks }
}
