import { css } from '@emotion/react'
import {
  LAYOUT_MAX_WIDTH,
  LAYOUT_HORIZONTAL_PADDING,
} from '@sojin-components/constants'

export function container(width = LAYOUT_MAX_WIDTH) {
  return css`
    width: calc(${width}px - 2 * ${LAYOUT_HORIZONTAL_PADDING}px);
    height: 100%;
    margin: 0 auto;
    padding: 0 ${LAYOUT_HORIZONTAL_PADDING}px;
  `
}
