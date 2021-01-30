import { css } from '@emotion/react'
import {
  FONT_SIZE_REGULAR,
  FONT_WEIGHT_REGULAR,
} from '@sojin-components/constants'

export function typographyRegular() {
  return css`
    font-size: ${FONT_SIZE_REGULAR};
    font-weight: ${FONT_WEIGHT_REGULAR};
  `
}
