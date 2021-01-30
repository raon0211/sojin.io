export const ROUTES = {
  home: () => '/',
  blog: () => '/blog',
  about: () => '/about',
  article: ({ id }: { id: string }) => `/blog/${id}`,
}
