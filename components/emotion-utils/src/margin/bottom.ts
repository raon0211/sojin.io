import { css } from '@emotion/react'

export function marginBottom(bottom: number | string) {
  if (typeof bottom === 'number') {
    return css`
      margin-bottom: ${bottom}px;
    `
  } else {
    return css`
      margin-bottom: ${bottom};
    `
  }
}
