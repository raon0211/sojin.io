import { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  container,
  flex,
  gutterHorizontal,
  marginBottom,
  padding,
  solidBackground,
} from '@sojin-components/emotion-utils'
import { LAYOUT_MAX_WIDTH } from '@sojin-components/constants'

interface Props {
  className?: string
  left?: ReactNode
  right?: ReactNode
}

export function NavigationBar({ className, left, right }: Props) {
  return (
    <Wrapper className={className}>
      <Container>
        <div
          css={[
            flex({
              alignItems: 'center',
            }),
          ]}
        >
          {left}
        </div>
        <RightContainer>{right}</RightContainer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  position: sticky;
  width: 100%;
  left: 0;
  top: 0;
  ${marginBottom('3rem')}
  ${padding('1rem 0')}
  ${solidBackground()}
`

const Container = styled.div`
  ${gutterHorizontal(24)}
  ${container(LAYOUT_MAX_WIDTH + 100)}
  ${flex()}
`

const RightContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
`
