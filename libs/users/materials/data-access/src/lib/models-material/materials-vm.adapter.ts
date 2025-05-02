import { MaterialsVM } from "./materials-vm";
import { MaterialsEntity } from "./materials.entity";

type MaterialsVMAdapter = {
  entityToVM(entity: MaterialsEntity): MaterialsVM;
};
  
export const materialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({ id, created_at, title, material_link, folder_id, material_format }) {
    return { id, created_at, title, material_link, folder_id, material_format };
  },
};