import { css } from '@emotion/react'
import {
  FONT_COLOR_TEXT,
  FONT_SIZE_H4,
  FONT_WEIGHT_H4,
} from '@sojin-components/constants'

export function typographyH4() {
  return css`
    font-size: ${FONT_SIZE_H4};
    font-weight: ${FONT_WEIGHT_H4};
    color: ${FONT_COLOR_TEXT};
  `
}
