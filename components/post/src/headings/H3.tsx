import styled from '@emotion/styled'
import { FONT_SIZE_H3 } from '@sojin-components/constants'
import {
  typographyH3,
  marginTop,
  marginBottom,
} from '@sojin-components/emotion-utils'

const H3 = styled.h3`
  ${typographyH3()}
  ${marginTop(FONT_SIZE_H3)}
	${marginBottom('0.25rem')}
`

export { H3 }
