import { MaterialsEntity } from '../../core/data-access/src';
import { MaterialsVM } from './materials-vm';

type MaterialsVMAdapter = {
  entityToVM(entity: MaterialsEntity): MaterialsVM;
};

export const materialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({ id, folderId, createdAt, materialLink, title, materialFormat }) {
    return { id, folderId, createdAt, materialLink, title, materialFormat };
  },
};
