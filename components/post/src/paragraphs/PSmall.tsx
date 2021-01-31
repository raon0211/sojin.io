import styled from '@emotion/styled'
import { FONT_SIZE_H3 } from '@sojin-components/constants'
import {
  marginTop,
  marginBottom,
  typographySmall,
} from '@sojin-components/emotion-utils'

const PSmall = styled.p`
  ${typographySmall()}
  ${marginTop(FONT_SIZE_H3)}
	${marginBottom(4)}
`

export { PSmall }
