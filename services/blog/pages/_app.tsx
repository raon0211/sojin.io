import { AppProps } from 'next/app'
import BlogNavigationBar from 'components/Navigation'
import { Container } from '@sojin-components/container'
import { css, Global } from '@emotion/react'
import normalize from 'emotion-normalize'
import { anchorReset, listReset } from '@sojin-components/emotion-utils'
import { AsyncStylesheet } from '@sojin-components/next-utils'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BlogNavigationBar />
      <Normalize />
      <AsyncStylesheet href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700,900|Noto+Sans+JP:400,500,700,900" />
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

        html {
          font-family: Noto Sans KR, Noto Sans JP, sans-serif;
          letter-spacing: -0.1px;
        }
      `}
    />
  )
}
