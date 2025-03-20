import { IMaterial } from '../models/material.model';
import { MaterialVM } from './material-vm';

type MaterialsVmAdapter = {
  entityToVM(entity: IMaterial): MaterialVM;
};

export const MaterialsVmAdapter: MaterialsVmAdapter = {
  entityToVM({ id, created_at, title, material_link, folder_id }) {
    return { id, created_at, title, material_link, folder_id };
  },
};
