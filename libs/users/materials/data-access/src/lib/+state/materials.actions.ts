import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FolderType } from '../models/folder.model';
import { MaterialType } from '../models/material.model';
import { FolderAddType } from '../models/folder-add.model';
import { MaterialAddType } from '../models/material-add.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: FolderType[]}>(),
    'Load Folders Failure': props<{error: Error}>(),

    'Add Folder': props<{title: FolderAddType}>(),
    'Add Folder Success': props<{folder: FolderType}>(),
    'Add Folder Failure': props<{error: Error}>(),

    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: Error}>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{materials: MaterialType[]}>(),
    'Load Materials Failure': props<{error: Error}>(),

    'Add Material': props<{material: MaterialAddType}>(),
    'Add Material Success': props<{material: MaterialType}>(),
    'Add Material Failure': props<{error: Error}>(),

    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: Error}>(),
  },
});
