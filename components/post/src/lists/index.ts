import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  gutterVertical,
  typographyRegular,
} from '@sojin-components/emotion-utils'

const listStyle = css`
  padding-left: 1.75rem;
  ${gutterVertical('0.25rem')}

  & > li {
    padding-left: 0.25rem;
  }
`

export const UnorderedList = styled.ul`
  ${listStyle}

  & > li {
    list-style: disc;
  }
`

export const OrderedList = styled.ol`
  ${listStyle}

  & > li {
    list-style: decimal;
  }
`

export const ListItem = styled.li`
  ${typographyRegular()}
`
