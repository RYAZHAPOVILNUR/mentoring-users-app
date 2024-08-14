export interface CreateComment {
  article_id: number;
  author_id: number;
  text: string;
  like_user_ids: number[];
  dislike_user_ids: number[];
}
