import styled from '@emotion/styled'
import { FONT_SIZE_H2 } from '@sojin-components/constants'
import {
  typographyH2,
  marginTop,
  marginBottom,
} from '@sojin-components/emotion-utils'

const H2 = styled.h2`
  ${typographyH2()}
  ${marginTop(FONT_SIZE_H2)}
	${marginBottom('1rem')}
`

export { H2 }
