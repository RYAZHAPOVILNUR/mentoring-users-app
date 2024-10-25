import { MaterialsEntity } from './data-access/src';
import { MaterialsVM } from './materials-vm';

export type MaterialsVMAdapter = {
  entityToVM(entity: MaterialsEntity): MaterialsVM
}

export const materialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({id, title, material_link, created_at, folder_id}) {
    return {
      id,
      title,
      materialLink: material_link,
      createdAt: created_at,
      folderId: folder_id,
    } as MaterialsVM;
  }
}
