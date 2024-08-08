import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { CreateFolder } from '../models/create-folder.model';
import { Material } from '../models/materials.model';
import { CreateMaterial } from '../models/create-materials.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(), 
    'Load Folders Failure': props<{ error: any }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: any }>(),

    'Add Folder': props<{ folderData: CreateFolder }>(),
    'Add Folder Success': props<{ folderData: Folder }>(),
    'Add Folder Failure': props<{ error: any }>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: any }>(),

    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: any}>(),

    'Add Material': props<{ materialData: CreateMaterial }>(),
    'Add Material Success': props<{ materialData: Material }>(),
    'Add Material Failure': props<{ error: any }>(),
  },
});
