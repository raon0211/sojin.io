import { NavigationMenu } from '../NavigationMenu'
import { NavigationBar } from './index'

export function Default() {
  return (
    <NavigationBar
      left="블로그"
      right={
        <NavigationMenu>
          <NavigationMenu.LinkedOption href="/">홈</NavigationMenu.LinkedOption>
          <NavigationMenu.LinkedOption href="/bio">
            소개
          </NavigationMenu.LinkedOption>
        </NavigationMenu>
      }
    />
  )
}

export default {
  title: 'Navigation',
  component: NavigationBar,
}
