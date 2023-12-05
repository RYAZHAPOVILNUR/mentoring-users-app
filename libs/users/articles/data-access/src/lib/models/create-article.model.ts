export interface CreateArticle {
  articlesId?: number | null;
  title: string;
  content: string;
  image?: string | null;
}
