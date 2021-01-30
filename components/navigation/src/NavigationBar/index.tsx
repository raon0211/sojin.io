import { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  MAX_WIDTH,
  NAVBAR_HEIGHT,
  NAVBAR_HORIZONTAL_PADDING,
} from '@sojin-components/constants'
import { flex, gutterHorizontal } from '@sojin-components/emotion-utils'

interface Props {
  left?: ReactNode
  right?: ReactNode
}

export function NavigationBar({ left, right }: Props) {
  return (
    <Wrapper>
      <Container css={gutterHorizontal(24)}>
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
  position: fixed;
  width: 100%;
  height: ${NAVBAR_HEIGHT};
  left: 0;
  top: 0;
`

const Container = styled.div`
  width: calc(${MAX_WIDTH} - 2 * ${NAVBAR_HORIZONTAL_PADDING});
  height: 100%;
  margin: 0 auto;
  padding: 0 ${NAVBAR_HORIZONTAL_PADDING};
  display: flex;
`

const RightContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
`
