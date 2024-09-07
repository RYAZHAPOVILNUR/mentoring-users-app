import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Folder } from '../models/folder.interface';
import { MaterialStatus } from '../enums/materials-status.enum';
import { CreateFolderInput } from '../models/create-folder-input.type';
import { Material } from '../models/material.interface';
import { CreateMaterialInput } from '../models/create-material-input.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{
      status: MaterialStatus.Error;
      error: Error;
    }>(),

    'Set Opened Folder': props<{ openedFolder: Folder }>(),

    'Create Folder': props<{ createFolderInput: CreateFolderInput }>(),
    'Create Folder Success': props<{ folder: Folder }>(),
    'Create Folder Failure': props<{
      status: MaterialStatus.Error;
      error: Error;
    }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: Error }>(),

    'Load Materials': props<{ folderId: number }>(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),

    'Create Material': props<{ createMaterialInput: CreateMaterialInput }>(),
    'Create Material Success': props<{ material: Material }>(),
    'Create Material Failure': props<{ error: Error }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: Error }>(),
  },
});
