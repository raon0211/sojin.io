import { css } from '@emotion/react'
import {
  FONT_COLOR_TEXT,
  FONT_SIZE_H1,
  FONT_WEIGHT_H1,
} from '@sojin-components/constants'

export function typographyH1() {
  return css`
    font-size: ${FONT_SIZE_H1};
    font-weight: ${FONT_WEIGHT_H1};
    color: ${FONT_COLOR_TEXT};
  `
}
