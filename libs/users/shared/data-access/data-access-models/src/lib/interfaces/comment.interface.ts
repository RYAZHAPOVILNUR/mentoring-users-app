export interface Comment {
  id: number;
  article_id: number;
  author_id: number;
  text: string;
  created_at: Date;
  author: {
    id: number;
    name: string;
    username: string;
    photo?: {
      url: string;
    };
  };
}
