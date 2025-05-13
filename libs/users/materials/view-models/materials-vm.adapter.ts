import { MaterialsType } from '../data-access/src/lib/models/materials.type';
import { MaterialsVM } from './materials-vm';

type MaterialsVMAdapter = {
  entityToVM(entity: MaterialsType): MaterialsVM;
};

export const MaterialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({ id, created_at, title, material_link, folder_id }) {
    return { id, created_at, title, material_link, folder_id };
  },
};
