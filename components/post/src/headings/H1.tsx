import styled from '@emotion/styled'
import { FONT_SIZE_TITLE } from '@sojin-components/constants'
import {
  typographyTitle,
  marginTop,
  marginBottom,
} from '@sojin-components/emotion-utils'

const H1 = styled.h1`
  ${typographyTitle()}
  ${marginTop(FONT_SIZE_TITLE)}
	${marginBottom(4)}
`

export { H1 }
