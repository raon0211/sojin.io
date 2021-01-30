import {
  flex,
  gutterHorizontal,
  listStyleNone,
} from '@sojin-components/emotion-utils'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { NavigationMenuLinkedOption } from './LinkedOption'
import { NavigationMenuOption } from './Option'

type UnorderedListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>

type Props = UnorderedListProps

export function NavigationMenu(props: Props) {
  return <ul {...props} css={[flex(), gutterHorizontal(8), listStyleNone()]} />
}

NavigationMenu.Option = NavigationMenuOption
NavigationMenu.LinkedOption = NavigationMenuLinkedOption
