import { UserComment } from "./user-comment.model";

export interface Article {
  id: number;
  created_at: Date;
  authorId: number;
  author: string;
  image: string;
  title: string;
  content: string;
  comments: UserComment[]
}
