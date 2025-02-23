import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Material': props<{ material: Material }>(),
    'Load Material Success': props<{ material: Material }>(),
    'Load Material Failure': props<{ error: unknown }>(),

    'Load Materails': emptyProps(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: unknown }>(),
    
    'Delete Materail': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: unknown }>(),
  },
});

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folder': props<{folder: Folder}>(),
    'Load Folder Success': props<{folder: Folder}>(),
    'Load Folder Failure': props<{error: unknown}>(),

    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: Folder[]}>(),
    'Load Folders Failure': props<{error: unknown}>(),

    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: unknown}>(),

    'Load Folder Id': emptyProps(),
  }
})