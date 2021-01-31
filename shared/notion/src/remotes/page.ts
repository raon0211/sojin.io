import { NotionBlock } from '../models'
import { parseContentsOfBlock } from '../parsers/block/items'
import { callNotionFunction } from './client'
import { NotionRecordMapResponse } from './types/record-map'

interface Options {
  pageId: string
}

interface NotionPageResponse {
  cursor: { stack: unknown[] }
  recordMap: NotionRecordMapResponse
}

export async function fetchNotionPageBlocks({
  pageId,
}: Options): Promise<NotionBlock[]> {
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

  const pageBlock = response.recordMap.block[pageId]

  if (pageBlock?.value.type !== 'page') {
    throw new Error(
      `Expected pageBlock type to be page, but got ${pageBlock.value.type}`
    )
  }

  const blocks = parseContentsOfBlock(
    pageBlock.value.content,
    response.recordMap.block
  )

  return blocks
}
