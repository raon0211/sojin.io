import { css } from '@emotion/react'
import {
  FONT_SIZE_SMALL,
  FONT_WEIGHT_SMALL,
  LINE_HEIGHT_SMALL,
} from '@sojin-components/constants'
import { fontColorTextSecondary } from '../font'

export function typographySmall() {
  return css`
    font-size: ${FONT_SIZE_SMALL};
    font-weight: ${FONT_WEIGHT_SMALL};
    line-height: ${LINE_HEIGHT_SMALL};
    ${fontColorTextSecondary()}
  `
}
