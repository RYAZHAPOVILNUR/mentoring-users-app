import { MaterialEntity } from '@users/core/data-access';
import { MaterialsVM } from './materials.vm';

type MaterialsVMAdapter = {
  entityToVM(entity: MaterialEntity): MaterialsVM;
};

export const materialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({ id , created_at , title , material_link , folder_id , isAudio , isPDF , isVideo }) {
    return { id , created_at , title , material_link , folder_id , isAudio , isPDF , isVideo };
  },
};
