import { Comment } from './comment.interface';

export interface Article {
  id: number;
  created_at: number;
  authorId: number;
  email: string;
  author: string;
  title: string;
  content: string;
  comments: Comment[];
}
