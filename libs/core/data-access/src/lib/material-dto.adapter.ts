import { MaterialDTO, TypeMaterial } from "./material-dto.model";
import { MaterialEntity } from "./material.entity";

type MaterialDTOAdapter = {
  DTOtoEntity(dto: MaterialDTO): MaterialDTO;
  entityToDTO(entity: MaterialEntity): MaterialDTO;
};

export const materialsDTOAdapter: MaterialDTOAdapter = {
  DTOtoEntity(dto) {
    const { typeMaterial, ...otherAddressFields } = dto;

    return {
      ...otherAddressFields,
      isPDF: typeMaterial === TypeMaterial.PDF,
    };
  },
  entityToDTO(entity) {
    const { isPDF, ...otherFields } = entity;

    return {
      ...otherFields,
      typeMaterial: isPDF ? TypeMaterial.PDF : TypeMaterial.Video,
    };
  },
};