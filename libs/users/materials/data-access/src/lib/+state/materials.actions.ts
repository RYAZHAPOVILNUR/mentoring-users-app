import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder, newFolder } from '../models/folders.interface';
import { Material } from '../models/materials.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{ error: Error }>(),

    'Create Folder': props<{ folder: newFolder }>(),
    'Create Folder Success': props<{ folder: Folder }>(),
    'Create Folder Failure': props<{ error: Error }>(),

    'Delete Folder': props<{ folderId: number }>(),
    'Delete Folder Success': props<{ folderId: number }>(),
    'Delete Folder Failure': props<{ error: Error }>(),
  },
});