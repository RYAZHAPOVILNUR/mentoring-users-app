import { MaterialEntity } from '../interfaces/material-entity.interface';

export type MaterialCreate = Pick<MaterialEntity, 'title' | 'materialLink' | 'folderId'>