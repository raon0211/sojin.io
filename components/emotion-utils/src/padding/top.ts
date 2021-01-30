import { css } from '@emotion/react'

export function paddingTop(top: number | string) {
  if (typeof top === 'number') {
    return css`
      padding-top: ${top}px;
    `
  } else {
    return css`
      padding-top: ${top};
    `
  }
}
