import styled from '@emotion/styled'
import { FONT_SIZE_H4 } from '@sojin-components/constants'
import {
  marginTop,
  marginBottom,
  typographyH4,
} from '@sojin-components/emotion-utils'

const H4 = styled.h4`
  ${typographyH4()}
  ${marginTop(FONT_SIZE_H4)}
	${marginBottom('0.25rem')}
`

export { H4 }
