import { MaterialsDTO } from "../models/materials-dto.model";
import { MaterialsEntity } from "../models/materials.entity";

export const materialsDTOAdapter = {
  DTOtoEntity<
    D extends Partial<MaterialsDTO> = MaterialsDTO,
    E extends Partial<MaterialsEntity> = MaterialsEntity
  >(dto: D): E {
    return {
      id: dto.id,
      createdAt: dto.created_at,
      title: dto.title,
      materialLink: dto.material_link,
      folderId: dto.folder_id,
    } as E;
  },
  entityToDTO<
    E extends Partial<MaterialsEntity> = MaterialsEntity,
    D extends Partial<MaterialsDTO> = MaterialsDTO
  >(entity: E): D {
    return {
      id: entity.id,
      created_at: entity.createdAt,
      title: entity.title,
      material_link: entity.materialLink,
      folder_id: entity.folderId,
    } as D;
  },
}
