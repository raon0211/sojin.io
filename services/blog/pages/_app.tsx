import { AppProps } from 'next/app'
import BlogNavigationBar from 'components/Navigation'
import { Container } from '@sojin-components/container'
import { css, Global } from '@emotion/react'
import normalize from 'emotion-normalize'
import { anchorReset, listReset } from '@sojin-components/emotion-utils'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BlogNavigationBar />
      <Normalize />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}

function Normalize() {
  return (
    <Global
      styles={css`
        ${normalize}

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
        }

        a {
          ${anchorReset()}
        }

        ul,
        li {
          ${listReset()}
        }

        p {
          margin: 0;
        }
      `}
    />
  )
}
