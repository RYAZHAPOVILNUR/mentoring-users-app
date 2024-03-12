import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { createdFolder, createdMaterial, Folder, Material } from '../model/folder.interface';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ data: Folder[] }>(),
    'Load Folders Failure': props<{ error: unknown }>(),

    'Create New Folder': props<{ createdFolder: createdFolder }>(),
    'Create New Folder Success': props<{ createdFolder: Folder }>(),
    'Create New Folder Failure': props<{ error: unknown }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: unknown }>(),
  }
});

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ data: Material[] }>(),
    'Load Materials Failure': props<{ error: unknown }>(),

    'Create Material': props<{ createdMaterial: createdMaterial }>(),
    'Create Material Success': props<{ createdMaterial: Material }>(),
    'Create Material Failure': props<{ error: unknown }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: unknown }>()
  }
})