import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddFolder, IFolder } from '../models/folder.model';
import { IAddMaterial, IMaterial } from '../models/material.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {

    'Load Folders':emptyProps(),
    'Load Folders Failure': props<{ error: string}>(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: string }>(),
    'Add Folder': props<{ title: IAddFolder }>(),
    'Add Folder Success': props<{ folder: IFolder  }>(),
    'Add Folder Failure': props<{ error: string }>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{ error: string }>(),
    'Add Material': props<{ newMaterial: IAddMaterial }>(),
    'Add Material Success': props<{ newMaterial: IMaterial }>(),
    'Add Material Failure': props<{ error: string }>(),
    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: string }>(),
  },
});