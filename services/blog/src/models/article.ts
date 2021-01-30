export interface Article {
  id: string
  title: string
  slug: string | null
  description: string | null
  publishedAt: string | null
  isPublished: boolean
}
