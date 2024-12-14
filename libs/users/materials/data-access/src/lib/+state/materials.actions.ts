import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { CreateFolder } from '../models/create-folder.model';
import { Material } from '../models/material.model';
import { CreateMaterial } from '../models/create-material.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    // folders
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folderData: Folder[] }>(),
    'Load Folders Failed': props<{  error: any  }>(),

    'Add Folder': props<{ folder: CreateFolder }>(),
    'Add Folder Success': props<{ folderData: Folder }>(),
    'Add Folder Failed': props<{  error: any  }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failed': props<{ error: any }>(),

    'Open Folder': emptyProps(),
    'Open Folder Success': props<{ folder: Folder }>(),
    'Open Folder Failed': props<{ error: any }>(),

    // materials
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{  error: any  }>(),

    'Add Materials': props<{ materials: CreateMaterial }>(),
    'Add Materials Success': props<{ materials: Material }>(),
    'Add Materials Failed': props<{  error: any  }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failed': props<{ error: any }>(),
  },
});
// export const addFolder = createAction('[Materials Page] Add Folder', props<{ folderData: CreateFolder }>());
// export const addFolderSuccess = createAction('[Materials Page] Add Folder', props<{ folderData: Folder[] }>());
// export const addFolderFailed = createAction('[Materials Page] Add Folder', props<{ error: any }>());
