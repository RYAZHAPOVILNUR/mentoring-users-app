import { FoldersDTO } from './folders-dto.models';
import { FoldersEntity } from './folders.entity';

type FoldersDTOAdapter = {
  DTOtoEntity(dto: FoldersDTO): FoldersEntity;
  EntitytoDTO(entity: FoldersEntity): FoldersDTO;
};

export const folderDTOAdapter: FoldersDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, ...otherFields } = dto;

    return {
      ...otherFields,
      createdAt: created_at,
    };
  },

  EntitytoDTO(entity) {
    const { createdAt, ...otherFields } = entity;

    return {
      ...otherFields,
      created_at: createdAt,
    };
  },
};
