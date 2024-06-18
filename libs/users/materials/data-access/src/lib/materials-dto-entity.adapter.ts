import { MaterialDTO } from './interfaces/material-dto.interface';
import { MaterialEntity } from './interfaces/material-entity.interface';

type MaterialsDtoEntityAdapter = {
  DTOtoEntity(dto: MaterialDTO): MaterialEntity;
  entityToDTO(entity: Partial<MaterialEntity>): Partial<MaterialDTO>;
};

export const materialsAdapter: MaterialsDtoEntityAdapter = {
  DTOtoEntity(dto) {
    return {
      id: dto.id,
      createdAt: dto.created_at,
      title: dto.title,
      materialLink: dto.material_link,
      folderId: dto.folder_id
    };
  },
  entityToDTO(entity) {
    return {
      id: entity?.id,
      created_at: entity?.createdAt,
      title: entity?.title,
      material_link: entity?.materialLink,
      folder_id: entity?.folderId
    };
  }
};