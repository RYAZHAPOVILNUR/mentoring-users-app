import { UserEntity } from '../types/user-entity.type';

export interface Comment {
  id: number;
  article_id: number;
  author_id: number;
  author: Pick<UserEntity, 'id' | 'name' | 'username'> & { photo?: { url: string } };
  text: string;
  created_at: Date;
}
