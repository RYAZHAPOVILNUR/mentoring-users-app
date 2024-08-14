export interface Comment {
  id: number;
  created_at: Date;
  article_id: number;
  author_id: number;
  text: string;
  like_user_ids: number[];
  dislike_user_ids: number[];
  author: {
    id: number;
    name: string;
    username: string;
    photo?: {
      url: string;
    };
  };
}