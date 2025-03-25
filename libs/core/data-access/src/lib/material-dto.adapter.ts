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
      isVideo: typeMaterial === TypeMaterial.Video,
      isAudio: typeMaterial === TypeMaterial.Audio,
    };
  },
  entityToDTO(entity) {
    const { isPDF, isVideo, isAudio, ...otherFields } = entity;

    return {
      ...otherFields,
      typeMaterial: isPDF ? TypeMaterial.PDF
      : isVideo ? TypeMaterial.Video
      : TypeMaterial.Audio
    };
  },
};