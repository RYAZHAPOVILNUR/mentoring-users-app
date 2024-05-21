import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateMaterialsDTO, MaterialsDTO } from '@users/core/data-access';
import { MaterialsErrors } from './materials.reducer';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Init Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialsDTO[] }>(),
    'Load Materials Failure': props<{ error: MaterialsErrors }>(),

    'Add Material': props<{ material: CreateMaterialsDTO }>(),
    'Add Material Success': props<{ material: MaterialsDTO }>(),
    'Add Material Failure': props<{ error: MaterialsErrors }>(),

    'Remove Material': props<{ id: number }>(),
    'Remove Material Success': props<{ id: number }>(),
    'Remove Material Failure': props<{ error: MaterialsErrors }>(),

    'Set Opened Folder Id': props<{ id: number }>(),
  },
});
