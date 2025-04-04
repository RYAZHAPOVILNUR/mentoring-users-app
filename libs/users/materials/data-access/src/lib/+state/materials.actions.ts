import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folders.interface';
import { Material } from '../models/materials.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{ error: Error }>(),
  },
});