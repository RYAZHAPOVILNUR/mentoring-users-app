import { DeepReadonly } from '@users/core/utils';

export type FoldersDTO = DeepReadonly<{
  id: number;
  created_at: string;
  title: string;
}>;

export type CreateFolderDTO = DeepReadonly<{
  id: number;
  created_at: string;
  title: string;
}>;

export type FoldersPhoto = {
  path: string;
  name: string;
  type: 'image';
  size: number;
  mime: 'image/jpeg';
  meta: {
    width: number;
    height: number;
  };
  url: string;
};
