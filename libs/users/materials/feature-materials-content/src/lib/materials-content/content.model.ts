import { Material } from '@users/materials/data-access';

export type ContentModel = Omit<Material, 'folder_id'> & { contentType: string };
