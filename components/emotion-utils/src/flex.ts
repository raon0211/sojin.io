import { css } from '@emotion/react'

interface FlexOptions {
  justifyContent?: 'flex-start' | 'space-between' | 'flex-end'
  alignItems?: 'flex-start' | 'center' | 'flex-end'
}

export function flex({ justifyContent, alignItems }: FlexOptions = {}) {
  return css`
    display: flex;
    ${justifyContent != null
      ? css`
          justify-content: ${justifyContent};
        `
      : undefined}
    ${alignItems != null
      ? css`
          align-items: ${alignItems};
        `
      : undefined}
  `
}
