import { css } from '@emotion/react'

export function marginTop(top: number | string) {
  if (typeof top === 'number') {
    return css`
      margin-top: ${top}px;
    `
  } else {
    return css`
      margin-top: ${top};
    `
  }
}
