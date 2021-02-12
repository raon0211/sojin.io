import { AppProps } from 'next/app'
import BlogNavigationBar from 'components/Navigation'
import { Container } from '@sojin-components/container'
import { css, Global } from '@emotion/react'
import normalize from 'emotion-normalize'
import { anchorReset, listReset, zIndex } from '@sojin-components/emotion-utils'
import { AsyncStylesheet } from '@sojin-components/next-utils'
import { EquationStylesheet } from '@sojin-components/equation'

const Z_INDEXES = {
  navigationBar: 2,
  content: 1,
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <BlogNavigationBar css={zIndex(Z_INDEXES.navigationBar)} />
      <Container css={zIndex(Z_INDEXES.content)}>
        <Component {...pageProps} />
      </Container>
    </>
  )
}

function Head() {
  return (
    <>
      <Normalize />
      <AsyncStylesheet href="https://fonts.googleapis.com/css?family=Fira+Code|Noto+Sans+KR:400,500,700,900|Noto+Sans+JP:400,500,700,900" />
      <EquationStylesheet />
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

        html {
          font-family: Noto Sans KR, Noto Sans JP, sans-serif;
          letter-spacing: -0.1px;
          font-size: 20px;
          word-break: keep-all;
        }

        pre {
          font-size: 0.9rem;
        }
      `}
    />
  )
}
