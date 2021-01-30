import { AppProps } from 'next/app'
import BlogNavigationBar from 'components/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BlogNavigationBar />
      <Component {...pageProps} />
    </>
  )
}
