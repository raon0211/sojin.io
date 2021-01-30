import { css } from '@emotion/react'

export function paddingBottom(bottom: number | string) {
  if (typeof bottom === 'number') {
    return css`
      padding-bottom: ${bottom}px;
    `
  } else {
    return css`
      padding-bottom: ${bottom};
    `
  }
}
