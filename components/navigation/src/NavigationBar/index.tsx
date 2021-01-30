import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { NAVBAR_HEIGHT } from '@sojin-components/constants'
import {
  container,
  flex,
  gutterHorizontal,
  marginBottom,
} from '@sojin-components/emotion-utils'

interface Props {
  left?: ReactNode
  right?: ReactNode
}

export function NavigationBar({ left, right }: Props) {
  return (
    <Wrapper>
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
  height: ${NAVBAR_HEIGHT};
  left: 0;
  top: 0;
  ${marginBottom('3rem')}
`

const Container = styled.div`
  ${gutterHorizontal(24)}
  ${container()}
  ${flex()}
`

const RightContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
`
