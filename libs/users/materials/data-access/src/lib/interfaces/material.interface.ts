import { LoadingStatus } from '@users/core/data-access';

export interface MaterialInterface {
  id: number,
  created_at: string,
  title: string,
  material_link: string,
  folder_id: number,
  status?: LoadingStatus,
}