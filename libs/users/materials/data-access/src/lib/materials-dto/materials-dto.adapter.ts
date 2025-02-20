import { MaterialsDTO } from './materials-dto.models';
import { MaterialsEntity } from './materials.entity';

type MaterialsDTOAdapter = {
  DTOtoEntity(dto: MaterialsDTO): MaterialsEntity;
  EntitytoDTO(entity: MaterialsEntity): MaterialsDTO;
};

export const materialsDTOAdapter: MaterialsDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, material_link, folder_id, ...otherFields } = dto;

    return {
      ...otherFields,
      createdAt: created_at,
      materialLink: material_link,
      folderId: folder_id,
    };
  },

  EntitytoDTO(entity) {
    const { createdAt, materialLink, folderId, ...otherFields } = entity;

    return {
      ...otherFields,
      created_at: createdAt,
      material_link: materialLink,
      folder_id: folderId,
    };
  },
};
