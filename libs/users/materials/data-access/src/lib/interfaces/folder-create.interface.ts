import { LoadingStatus } from '@users/core/data-access';

export interface FolderCreateInterface {
  id: number,
  created_at: string,
  title: string,
  status?: LoadingStatus,
}