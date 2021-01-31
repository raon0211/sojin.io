import { css, Global } from '@emotion/react'
import { AsyncStylesheet } from '@sojin-components/next-utils'

export function EquationStylesheet() {
  return (
    <>
      <AsyncStylesheet href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" />
      <Global
        styles={css`
          .katex {
            font-size: 1.1em;
            display: inline-block;
          }
        `}
      />
    </>
  )
}
