import { css } from '@emotion/react'
import {
  FONT_COLOR_TEXT,
  FONT_SIZE_H2,
  FONT_WEIGHT_H2,
} from '@sojin-components/constants'

export function typographyH2() {
  return css`
    font-size: ${FONT_SIZE_H2};
    font-weight: ${FONT_WEIGHT_H2};
    color: ${FONT_COLOR_TEXT};
  `
}
