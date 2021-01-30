import { css } from '@emotion/react'

export function gutterVertical(space: string | number = 24, selector = '*') {
  return css`
    & > ${selector} ~ ${selector} {
      margin-top: ${typeof space === 'number' ? `${space}px` : space};
    }
  `
}
