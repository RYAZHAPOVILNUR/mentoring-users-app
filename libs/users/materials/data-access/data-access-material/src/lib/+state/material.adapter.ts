import { MaterialDTO } from '../interfaces/material-dto';
import { Material } from '../interfaces/material.interface';

export function mapMaterialFromApi(dto: MaterialDTO): Material {
  return {
    id: dto.id,
    created_at: dto.created_at,
    title: dto.title,
    materialLink: dto.material_link,
    folderId: dto.folder_id,
  };
}

export function mapMaterialsFromApi(apiDataArray: MaterialDTO[]): Material[] {
  return apiDataArray.map((apiData) => ({
    id: apiData.id,
    created_at: apiData.created_at,
    title: apiData.title,
    materialLink: apiData.material_link,
    folderId: apiData.folder_id,
  }));
}
