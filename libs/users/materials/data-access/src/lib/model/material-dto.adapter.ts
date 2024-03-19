import { FolderDTO, MaterialDTO } from "./material-dto.model"
import { FolderEntity, MaterialEntity } from "./material.entity"


type FolderDTOAdapter = {
  DTOtoEntity(dto: FolderDTO): FolderEntity,
  entityToDTO(entity: FolderEntity): FolderDTO
}

export const folderDTOAdapter: FolderDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, id, title } = dto

    return {
      id,
      title,
      createdDate:created_at
    }
  },
  entityToDTO(entity) {
    const { createdDate, id, title } = entity;

    return {
      created_at:createdDate,
      id,
      title,
    };
  }
}

type MaterialDTOAdapter = {
  DTOtoEntity(dto: MaterialDTO): MaterialEntity,
  entityToDTO(entity: MaterialEntity): MaterialDTO
}

export const materialDTOAdapter: MaterialDTOAdapter = {
  DTOtoEntity(dto) {
    const { created_at, folder_id, id, material_link, title } = dto

    return {
      id,
      title,
      createdDate: created_at,
      folderId: folder_id,
      link: material_link
    }
  },
  entityToDTO(entity) {
    const { createdDate, id, title, folderId, link } = entity;

    return {
      created_at:createdDate,
      id,
      title,
      folder_id: folderId,
      material_link: link
    };
  }
}


