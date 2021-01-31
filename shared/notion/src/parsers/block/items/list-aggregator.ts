import { NotionBlock } from '../../../models/blocks/block'
import { NotionListItemBlock } from '../../../models/blocks/list'

type State =
  | { orderType: 'unknown'; items: null }
  | { orderType: 'ordered' | 'unordered'; items: NotionListItemBlock[] }

// TODO: Refactor using xstate
export function createListAggregator() {
  let state: State = { orderType: 'unknown', items: null }

  function add(item: NotionBlock) {
    switch (state.orderType) {
      case 'unknown': {
        if (item.type !== 'list_item') {
          return null
        } else {
          state = {
            orderType: item.orderType,
            items: [item],
          }

          return null
        }
      }
      case 'ordered':
      case 'unordered': {
        if (item.type !== 'list_item') {
          const prevState = state

          state = {
            orderType: 'unknown',
            items: null,
          }

          return prevState
        } else if (item.orderType !== state.orderType) {
          const prevState = state

          state = {
            orderType: item.orderType,
            items: [item],
          }

          return prevState
        } else {
          state.items.push(item)
          return null
        }
      }
    }
  }

  return { add }
}
