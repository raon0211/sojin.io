import { css } from '@emotion/react'
import {
  FONT_COLOR_TEXT,
  FONT_SIZE_H3,
  FONT_WEIGHT_H3,
} from '@sojin-components/constants'

export function typographyH3() {
  return css`
    font-size: ${FONT_SIZE_H3};
    font-weight: ${FONT_WEIGHT_H3};
    color: ${FONT_COLOR_TEXT};
  `
}
