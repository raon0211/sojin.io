import { AppProps } from 'next/app'
import { Navigation } from '@sojin-components/navigation'
import NavigationLogo from '../src/components/NavigationLogo'
import Link from 'next/link'
import { ROUTES } from 'routes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation
        left={
          <Link href={ROUTES.Home()} passHref>
            <NavigationLogo />
          </Link>
        }
      />
      <Component {...pageProps} />
    </>
  )
}
