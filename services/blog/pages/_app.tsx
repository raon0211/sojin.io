import { AppProps } from 'next/app'
import BlogNavigationBar from 'components/Navigation'
import { Container } from '@sojin-components/container'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BlogNavigationBar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
