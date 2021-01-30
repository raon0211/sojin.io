import { fetchArticles } from '../../src/remotes/fetchArticles'
import { H1 } from '@sojin-components/post'
import { Article } from 'models/article'
import { marginBottom } from '@sojin-components/emotion-utils'
import ArticleItem from '../../src/components/ArticleItem'
import Link from 'next/link'
import { ROUTES } from '../../src/routes'

export default function Blog({ articles }: { articles: Article[] }) {
  return (
    <>
      <H1 css={marginBottom(16)}>최근 올라온 글</H1>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={ROUTES.article({ id: article.slug ?? article.id })}>
              <a>
                <ArticleItem article={article} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const articles = await fetchArticles()

  return { props: { articles } }
}
