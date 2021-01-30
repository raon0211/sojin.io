import { css } from '@emotion/react'

export function fontWeight(
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
) {
  return css`
    font-weight: ${weight};
  `
}
