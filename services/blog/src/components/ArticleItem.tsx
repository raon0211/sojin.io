import styled from '@emotion/styled'
import {
  fontColorTextSecondary,
  gutterVertical,
  typographyH3,
  typographyRegular,
} from '@sojin-components/emotion-utils'
import { isNotNil } from '@sojin/utils'
import { memo } from 'react'
import { Article } from '../models/article'

interface Props {
  article: Article
}

function ArticleItem({ article }: Props) {
  const description = [article.publishedAt, article.description]
    .filter(isNotNil)
    .join(' · ')

  return (
    <Container css={gutterVertical(12)}>
      <h3 css={typographyH3()}>{article.title}</h3>
      <p css={[typographyRegular(), fontColorTextSecondary()]}>{description}</p>
    </Container>
  )
}

export default memo(ArticleItem)

const Container = styled.article`
  padding: 16px 0;
`
