import { MaterialsEntity } from './materials.entity';
import { MaterialsVM } from './materials-vm';

type MaterialsVMAdapter = {
  entityToVM(entity: MaterialsEntity): MaterialsVM;
};

export const materialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({ id, title, createdAt, materialLink, folderId }) {
    return { id, title, createdAt, materialLink, folderId };
  },
};
