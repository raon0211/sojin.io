import { css } from '@emotion/react'

export function padding(padding: number | string) {
  return css`
    padding: ${padding};
  `
}
