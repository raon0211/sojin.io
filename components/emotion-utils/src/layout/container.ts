import { css } from '@emotion/react'
import {
  LAYOUT_MAX_WIDTH,
  LAYOUT_HORIZONTAL_PADDING,
} from '@sojin-components/constants'

export function container() {
  return css`
    width: calc(${LAYOUT_MAX_WIDTH} - 2 * ${LAYOUT_HORIZONTAL_PADDING});
    height: 100%;
    margin: 0 auto;
    padding: 0 ${LAYOUT_HORIZONTAL_PADDING};
  `
}
