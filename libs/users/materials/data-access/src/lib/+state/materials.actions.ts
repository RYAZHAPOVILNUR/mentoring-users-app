import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolder, Folder } from '../models/folder.models';
import { Material } from '../models/material.models';

export const MaterialsActions = createActionGroup({
  source: 'Materials Page',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: Folder[]}>(),
    'Load Folders Failure': props<{ error: null }>(),

    'Add Folder':props<{newFolder: CreateFolder}>(),
    'Add Folder Success': props<{newFolder: Folder}>(),
    'Add Folder Failure': props<{ error: null }>(),

    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{ error: null }>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{materials: Material[]}>(),
    'Load Materials Failure': props<{ error: null }>(),
  }
});
