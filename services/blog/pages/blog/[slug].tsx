import { Article } from '../../src/models/article'
import { fetchArticles } from '../../src/remotes/fetchArticles'
import { H1 } from '@sojin-components/post'
import { ROUTES } from '../../src/routes'
import { fetchArticleInfo } from '../../src/remotes/fetchArticle'
import { NotionBlock } from '@sojin/notion'

interface Props {
  article: Article
  blocks: NotionBlock[]
}

export default function BlogArticle({ article, blocks }: Props) {
  if (article == null) {
    return null
  }

  return (
    <>
      <H1>{article.title}</H1>

      {blocks.map((block) => {
        switch (block.type) {
          case 'text': {
            return <p key={block.id}>{block.value}</p>
          }
        }
      })}
    </>
  )
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const result = await fetchArticleInfo(slug)

  return { props: result ?? {} }
}

export async function getStaticPaths() {
  const articles = await fetchArticles()

  return {
    paths: articles.map((x) => ROUTES.article({ id: x.id })),
    fallback: true,
  }
}
