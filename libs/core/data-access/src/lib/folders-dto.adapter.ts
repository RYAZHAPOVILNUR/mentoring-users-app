import { FolderDTO, TypeFolder } from "./folder-dto.model";
import { FolderEntity } from "./folders.entity";

type FolderDTOAdapter = {
  DTOtoEntity(dto: FolderDTO): FolderEntity;
  entityToDTO(entity: FolderEntity): FolderDTO;
};

export const foldersDTOAdapter: FolderDTOAdapter = {
  DTOtoEntity(dto) {
    const { typeFolder, ...otherAddressFields } = dto;

    return {
      ...otherAddressFields,
      isOwn: typeFolder === TypeFolder.MyFolders,
    };
  },
  entityToDTO(entity) {
    const { isOwn, ...otherFields } = entity;

    return {
      ...otherFields,
      typeFolder: isOwn ? TypeFolder.MyFolders : TypeFolder.MentorsFolders,
    };
  },
};