import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder, newFolder } from '../models/folders.interface';
import { Material, newMaterial } from '../models/materials.interface';

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

    'Open Folder': props<{ folderId: number }>(),

    'Load Materials': props<{ folderId: number }>(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),

    'Create Material': props<{ material: newMaterial }>(),
    'Create Material Success': props<{ material: Material }>(),
    'Create Material Failure': props<{ error: Error }>(),
  },
});