import styled from '@emotion/styled'
import { FONT_SIZE_H1 } from '@sojin-components/constants'
import {
  typographyH1,
  marginTop,
  marginBottom,
} from '@sojin-components/emotion-utils'

const H1 = styled.h1`
  ${typographyH1()}
  ${marginTop(FONT_SIZE_H1)}
	${marginBottom('1rem')}
`

export { H1 }
