import { ReactNode } from 'react'

import styled from '@emotion/styled'

interface Props {
  className?: string
  children: ReactNode
}

export function NavigationMenuOption({ className, children }: Props) {
  return <Container>{children}</Container>
}

const Container = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
`
