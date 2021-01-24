import { fetchArticles } from '../../src/remotes/fetchArticles'

export default function Blog({ articles }: { articles: any }) {
  return <div>{JSON.stringify(articles, null, 2)}</div>
}

export async function getStaticProps() {
  const articles = await fetchArticles()

  return { props: { articles } }
}
