import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddFolder, IFolder, IMaterial, MaterialsError } from './materials.reducer';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failure': props<{ error: MaterialsError }>(),

    'Add Folder': props<{ folder: IAddFolder }>(),
    'Add Folder Success': props<{ folder: IFolder }>(),
    'Add Folder Failure': props<{ error: MaterialsError }>(),

    'Delete Folder': props<{ id: string }>(),
    'Delete Folder Success': props<{ id: string }>(),
    'Delete Folder Failure': props<{ error: MaterialsError }>(),

    'Open Folder': emptyProps(),
    'Open Folder Success': props<{ folder: IFolder }>(),
    'Open Folder Failure': props<{ error: MaterialsError }>(),

    'Reset State': emptyProps(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{ error: MaterialsError }>(),

    'Add Material': props<{ material: IMaterial }>(),
    'Add Material Success': props<{ material: IMaterial }>(),
    'Add Material Failure': props<{ error: MaterialsError }>(),

    'Delete Material': props<{ materialId: string }>(),
    'Delete Material Success': props<{ materialId: string }>(),
    'Delete Material Failure': props<{ error: MaterialsError }>(),

    'Open Material': props<{ material: IMaterial }>(),
    'Open Material Success': props<{ material: IMaterial }>(),
    'Open Material Failure': props<{ error: MaterialsError }>(),
  },
});
