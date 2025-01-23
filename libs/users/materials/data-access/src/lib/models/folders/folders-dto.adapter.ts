import { TFoldersDTO } from './folder-dto.model';
import { TFoldersEntity } from './folders.entity';

type TFoldersDTOAdapter = {
  DTOtoEntity(dto: TFoldersDTO): TFoldersEntity;
  entityToDTO(entity: TFoldersEntity): TFoldersDTO;
};

export const foldersDTOAdapter: TFoldersDTOAdapter = {
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
