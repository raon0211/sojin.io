import { Article } from '../../src/models/article'
import { fetchArticles } from '../../src/remotes/fetchArticles'
import {
  H1,
  H2,
  H3,
  H4,
  PSmall,
  UnorderedList,
  OrderedList,
  ListItem,
} from '@sojin-components/post'
import { ROUTES } from '../../src/routes'
import { fetchArticleInfo } from '../../src/remotes/fetchArticle'
import { NotionBlock } from '@sojin/notion'
import {
  fontColorTextSecondary,
  margin,
  marginBottom,
  marginTop,
  paddingBottom,
  typographyRegular,
} from '@sojin-components/emotion-utils'
import { NotionTextRenderer } from '../../src/components/NotionText'
import { LazyEquation } from 'components/NotionText'
import { CodeBlock } from '@sojin-components/code-block'
import { useCallback } from 'react'

interface Props {
  article: Article
  blocks: NotionBlock[]
}

export default function BlogArticle({ article, blocks }: Props) {
  const renderItems = useCallback((blocks: NotionBlock[]): JSX.Element => {
    return (
      <>
        {blocks.map((block) => {
          switch (block.type) {
            case 'header': {
              return (
                <H2 key={block.id} css={marginTop('3.5rem')}>
                  <NotionTextRenderer texts={block.value} />
                </H2>
              )
            }
            case 'sub_header': {
              return (
                <H3 key={block.id} css={marginTop('3rem')}>
                  <NotionTextRenderer texts={block.value} />
                </H3>
              )
            }
            case 'sub_sub_header': {
              return (
                <H4 key={block.id} css={marginTop('2.5rem')}>
                  <NotionTextRenderer texts={block.value} />
                </H4>
              )
            }
            case 'text': {
              return (
                <p key={block.id} css={[typographyRegular(), margin('1rem 0')]}>
                  <NotionTextRenderer texts={block.value} />
                </p>
              )
            }
            case 'equation': {
              return (
                <pre key={block.id}>
                  <LazyEquation equation={block.equation} displayMode={true} />
                </pre>
              )
            }
            case 'code': {
              return (
                <CodeBlock key={block.id}>
                  <code>{block.code}</code>
                </CodeBlock>
              )
            }
            case 'list': {
              if (block.children == null) {
                return
              }

              const ListComponent =
                block.orderType === 'ordered' ? OrderedList : UnorderedList

              return (
                <ListComponent key={block.id}>
                  {renderItems(block.children)}
                </ListComponent>
              )
            }
            case 'list_item': {
              return (
                <ListItem key={block.id}>
                  <NotionTextRenderer texts={block.value} />
                  {block.children != null ? renderItems(block.children) : null}
                </ListItem>
              )
            }
          }
        })}
      </>
    )
  }, [])

  if (article == null) {
    return null
  }

  return (
    <article>
      <header css={marginBottom('3rem')}>
        <H1>{article.title}</H1>
        <PSmall css={fontColorTextSecondary()}>{article.description}</PSmall>
      </header>

      <section css={paddingBottom('6rem')}>{renderItems(blocks)}</section>
    </article>
  )
}

export async function getServerSideProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const result = await fetchArticleInfo(slug)

  return { props: result ?? {} }
}
