import { isNotNil } from '@sojin/utils'
import { NotionPage } from '../models'
import { callNotionFunction } from './client'
import { parseNotionBlockResponse } from './types/block'
import { NotionRecordMapResponse } from './types/record-map'

interface Options {
  pageId: string
}

interface NotionPageResponse {
  cursor: { stack: unknown[] }
  recordMap: NotionRecordMapResponse
}

export async function fetchNotionPage({
  pageId,
}: Options): Promise<NotionPage> {
  const response = await callNotionFunction<NotionPageResponse>(
    'loadPageChunk',
    {
      body: {
        pageId,
        limit: 999,
        cursor: {
          stack: [],
        },
        chunkNumber: 0,
        verticalColumns: false,
      },
    }
  )

  const blocks = Object.entries(response.recordMap.block)
    .map(([id, blockResponse]) => {
      return parseNotionBlockResponse(id, blockResponse.value)
    })
    .filter(isNotNil)

  return {
    blocks,
  }
}
