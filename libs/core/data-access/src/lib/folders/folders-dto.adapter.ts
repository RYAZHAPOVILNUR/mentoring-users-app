import { FoldersDTO } from './folders-dto.model';
import { FoldersEntity } from './folders.entity';

type FoldersDTOAdapter = {
  DTOtoEntity(dto: FoldersDTO): FoldersEntity;
  entityToDTO(entity: FoldersEntity): FoldersDTO;
};

export const foldersDTOAdapter: FoldersDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, ...otherFields } = dto;

    return {
      ...otherFields,
      createdAt: created_at
    };
  },
  entityToDTO(entity) {
    const { createdAt, ...otherFields } = entity;

    return {
      ...otherFields,
      created_at: createdAt
    };
  },
};
