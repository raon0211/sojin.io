import { fetchArticles } from '../../src/remotes/fetchArticles'
import { H1 } from '@sojin-components/post'
import { Article } from 'models/article'

export default function Blog({ articles }: { articles: Article[] }) {
  return (
    <div>
      {articles.map((article) => (
        <H1 key={article.id}>{article.title}</H1>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const articles = await fetchArticles()

  return { props: { articles } }
}
