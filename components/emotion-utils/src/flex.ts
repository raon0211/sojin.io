import { css } from '@emotion/react'

interface FlexOptions {
  alignItems?: 'flex-start' | 'center' | 'flex-end'
}

export function flex({ alignItems }: FlexOptions = {}) {
  return css`
    display: flex;
    ${alignItems != null
      ? css`
          align-items: ${alignItems};
        `
      : undefined}
  `
}
