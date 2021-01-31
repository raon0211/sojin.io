import styled from '@emotion/styled'
import {
  fontColorTextSecondary,
  gutterVertical,
  typographyH3,
  typographyRegular,
} from '@sojin-components/emotion-utils'
import { memo } from 'react'
import { Article } from '../models/article'

interface Props {
  article: Article
}

function ArticleItem({ article }: Props) {
  return (
    <Container css={gutterVertical('0.5rem')}>
      <h3 css={typographyH3()}>{article.title}</h3>
      <p css={[typographyRegular(), fontColorTextSecondary()]}>
        {article.description}
      </p>
    </Container>
  )
}

export default memo(ArticleItem)

const Container = styled.article`
  padding: 1rem 0;
`
