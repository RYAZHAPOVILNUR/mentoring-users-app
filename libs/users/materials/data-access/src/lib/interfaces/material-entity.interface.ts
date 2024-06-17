import { MaterialDTO } from './material-dto.interface';

type RenameKeys<T> = {
  [K in keyof T as K extends 'created_at' ? 'createdAt' :
    K extends 'material_link' ? 'materialLink' :
      K extends 'folder_id' ? 'folderId' :
        K]: T[K]
};
type PartialMaterialEntity = RenameKeys<Omit<MaterialDTO, 'created_at' | 'material_link' | 'folder_id'>>;

export interface MaterialEntity extends PartialMaterialEntity {
  createdAt: Date;
  materialLink: string;
  folderId: number;
}

