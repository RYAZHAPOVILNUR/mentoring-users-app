import { MaterialDTO } from './material-dto.type';

export type CreateMaterialDTO = Pick<MaterialDTO, 'title' | 'material_link' | 'folder_id'>;
