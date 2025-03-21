import { TFolderDTO } from './folder-dto.model';
import { TFolderEntity } from './folder.entity';

type TFolderDTOAdapter = {
  DTOtoEntity(dto: TFolderDTO): TFolderEntity;
  entityToDTO(entity: TFolderEntity): TFolderDTO;
};

export const folderDTOAdapter: TFolderDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, ...otherAddressFields } = dto;

    return {
      ...otherAddressFields,
      createdAt: created_at,
    };
  },
  entityToDTO(entity) {
    const { createdAt, ...otherFields } = entity;

    return {
      ...otherFields,
      created_at: createdAt,
    };
  },
};
