export interface Comment {
  id: number,
  created_at: Date,
  articleId: string,
  authorId: string,
  text: string
}
