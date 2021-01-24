import { css } from '@emotion/react'

export function circle(diameter: string) {
  return css`
    width: ${diameter};
    height: ${diameter};
    border-radius: ${diameter};
  `
}
