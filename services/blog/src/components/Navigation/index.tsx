import { NavigationBar, NavigationMenu } from '@sojin-components/navigation'
import Link from 'next/link'
import React from 'react'
import { ROUTES } from '../../routes'
import NavigationLogo from './Logo'

export default function BlogNavigationBar() {
  return (
    <NavigationBar
      left={
        <Link href={ROUTES.home()} passHref>
          <NavigationLogo />
        </Link>
      }
      right={
        <NavigationMenu>
          <Link href={ROUTES.blog()}>
            <NavigationMenu.LinkedOption>블로그</NavigationMenu.LinkedOption>
          </Link>
          <Link href={ROUTES.about()}>
            <NavigationMenu.LinkedOption>소개</NavigationMenu.LinkedOption>
          </Link>
        </NavigationMenu>
      }
    />
  )
}
