import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';
import { FolderAdd } from '../models/folder-add.model';
import { MaterialAdd } from '../models/material-add.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: Folder[]}>(),
    'Load Folders Failure': props<{error: Error}>(),

    'Add Folder': props<{title: FolderAdd}>(),
    'Add Folder Success': props<{folder: Folder}>(),
    'Add Folder Failure': props<{error: Error}>(),

    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: Error}>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{materials: Material[]}>(),
    'Load Materials Failure': props<{error: Error}>(),

    'Add Material': props<{material: MaterialAdd}>(),
    'Add Material Success': props<{material: Material}>(),
    'Add Material Failure': props<{error: Error}>(),

    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: Error}>(),
  },
});
