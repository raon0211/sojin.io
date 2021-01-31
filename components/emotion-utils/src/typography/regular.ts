import { css } from '@emotion/react'
import {
  FONT_SIZE_REGULAR,
  FONT_WEIGHT_REGULAR,
  LINE_HEIGHT_REGULAR,
} from '@sojin-components/constants'
import { fontColorText } from '../font'

export function typographyRegular() {
  return css`
    font-size: ${FONT_SIZE_REGULAR};
    font-weight: ${FONT_WEIGHT_REGULAR};
    line-height: ${LINE_HEIGHT_REGULAR};
    ${fontColorText()}
  `
}
