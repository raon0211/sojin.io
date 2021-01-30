import { css } from '@emotion/react'

export function gutterHorizontal(space = 24, selector = '*') {
  return css`
    & > ${selector} ~ ${selector} {
      margin-left: ${space}px;
    }
  `
}
