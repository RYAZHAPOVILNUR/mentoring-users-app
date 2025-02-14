import { LoadingStatus } from '@users/core/data-access';
import { MaterialsErrors } from '../materials/+state/materials.reducer';

export type MaterialsDTO = {
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
};

export type CreateMaterialDTO = {
  title: string;
  material_link: string;
  folder_id: number;
};

export type MaterialsEntity = {
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
};

export type MaterialsVM = {
  id: number;
  created_at: number;
  title: string;
  material_link: string;
  folder_id: number;
};

export type MaterialsListVM = {
  materials: MaterialsVM[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
};
