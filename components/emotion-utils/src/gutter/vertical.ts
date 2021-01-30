import { css } from '@emotion/react'

export function gutterVertical(space = 24, selector = '*') {
  return css`
    & > ${selector} ~ ${selector} {
      margin-top: ${space}px;
    }
  `
}
