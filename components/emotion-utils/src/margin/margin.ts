import { css } from '@emotion/react'

export function margin(margin: number | string) {
  return css`
    margin: ${margin};
  `
}
