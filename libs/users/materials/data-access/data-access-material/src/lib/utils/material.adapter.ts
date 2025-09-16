import { CreateMaterialDTO } from '../types/create-material-dto.type';
import { MaterialDTO } from '../types/material-dto.type';
import { MaterialEntity } from '../types/material-entity.type';
import { MaterialFormData } from '../types/material-form.type';
import { MaterialVM } from '../types/material-vm.type';

type MaterialAdapter = {
  DTOtoEntity(dto: MaterialDTO): MaterialEntity;
  entityToDTO({ title, materialLink, folderId }: MaterialFormData & { folderId: number }): CreateMaterialDTO;
  entityToVM(entity: MaterialEntity): MaterialVM;
};

export const materialAdapter: MaterialAdapter = {
  DTOtoEntity(dto) {
    return {
      id: dto.id,
      created_at: dto.created_at,
      title: dto.title,
      materialLink: dto.material_link,
      folderId: dto.folder_id,
    };
  },
  entityToDTO({ title, materialLink, folderId }) {
    return {
      title: title,
      material_link: materialLink,
      folder_id: Number(folderId),
    };
  },
  entityToVM({ id, title, materialLink, folderId, created_at }) {
    return { id, title, materialLink, folderId, created_at };
  },
};
