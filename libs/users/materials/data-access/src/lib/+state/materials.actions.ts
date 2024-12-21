import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IMaterial } from '../models/material.model';
import { IFolder } from '../models/folder.model';
import _default from 'chart.js/dist/plugins/plugin.tooltip';
import numbers = _default.defaults.animations.numbers;

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials Folders': emptyProps(),
    'Load Materials Folders Success': props<{folders: IFolder[]}>(),
    'Load Materials Folders Failure': props<{error: any}>(),

    'Add Materials Folder': props<{title: string}>(),
    'Add Materials Folder Success': props<{folder:IFolder}>(),
    'Add Materials Folder Failure': props<{error: any}>(),

    'Delete Materials Folder': props<{folder_id: number}>(),
    'Delete Materials Folder Success': props<{folder_id: number}>(),
    'Delete Materials Folder Failure': props<{error: any}>(),


    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{ error: any }>(),

    'Add Materials ': props<{ materials: string }>(),
    'Add Materials Success': props<{ materials: IMaterial[] }>(),
    'Add Materials Failure': props<{ error: any }>(),

    'Delete Material': emptyProps(),
    'Delete Materials Success': props<{ materials: IMaterial[] }>(),
    'Delete Materials Failure': props<{ error: any }>(),
  },
});
