import { Comment } from './comment.interface';

export interface Article {
  id: number;
  created_at: Date;
  authorId: number;
  author: string;
  image: string;
  title: string;
  content: string;
  comments: Comment[];
}
