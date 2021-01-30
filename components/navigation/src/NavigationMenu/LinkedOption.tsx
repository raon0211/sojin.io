import styled from '@emotion/styled'
import { DIMMED_BACKGROUND } from '@sojin-components/constants'
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { NavigationMenuOption } from './Option'
import {
  anchorReset,
  fontColorTextSecondary,
  fontSizeSmall,
} from '@sojin-components/emotion-utils'

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

interface Props extends AnchorProps {
  className?: string
  children?: ReactNode
}

export function NavigationMenuLinkedOption({
  className,
  children,
  ...rest
}: Props) {
  return (
    <NavigationMenuOption className={className}>
      <Anchor {...rest}>{children}</Anchor>
    </NavigationMenuOption>
  )
}

const Anchor = styled.a`
  ${anchorReset()}
  ${fontSizeSmall()}
  ${fontColorTextSecondary()}
  padding: 10px;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: ${DIMMED_BACKGROUND};
  }
`
