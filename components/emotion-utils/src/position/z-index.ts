import { css } from '@emotion/react'

export function zIndex(index: number) {
  return css`
    z-index: ${index};
  `
}
