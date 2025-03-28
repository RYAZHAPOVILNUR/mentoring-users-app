import { TMaterial } from '../models/material.type';
import { MaterialVM } from './material-vm';

type MaterialsVmAdapter = {
  entityToVM(entity: TMaterial): MaterialVM;
};

export const MaterialsVmAdapter: MaterialsVmAdapter = {
  entityToVM({ id, created_at, title, material_link, folder_id }) {
    return { id, created_at, title, material_link, folder_id };
  },
};
