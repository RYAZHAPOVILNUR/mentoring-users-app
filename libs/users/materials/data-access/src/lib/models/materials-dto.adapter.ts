import { MaterialsDTO } from './materials-dto.model';
import { MaterialsEntity } from './materials.entity';

type MaterialsDTOAdapter = {
  DTOtoEntity(dto: MaterialsDTO): MaterialsEntity;
  entityToDTO(entity: MaterialsEntity): MaterialsDTO;
}

export const materialsDTOAdapter: MaterialsDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, material_link, folder_id, ...otherFields } = dto;

    return {
     ...otherFields,
      createdAt: created_at,
      materialLink: material_link,
      folderId: folder_id
    };
  },
  entityToDTO(entity) {
    const { createdAt, materialLink, folderId, ...otherFields } = entity;

    return {
     ...otherFields,
      created_at: createdAt,
      material_link: materialLink,
      folder_id: folderId
    };
  }

}
