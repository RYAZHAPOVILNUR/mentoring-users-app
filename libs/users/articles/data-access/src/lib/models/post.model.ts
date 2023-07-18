export interface Post {
  id: number;
  authorId: number;
  author: string;
  image: string;
  title: string;
  content: string;
  comment: Comment
}
