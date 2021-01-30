import { css } from '@emotion/react'

export function gutterHorizontal(space: string | number = 24, selector = '*') {
  return css`
    & > ${selector} ~ ${selector} {
      margin-left: ${typeof space === 'number' ? `${space}px` : space};
    }
  `
}
