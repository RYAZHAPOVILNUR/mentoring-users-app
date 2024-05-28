import { createActionGroup, props } from '@ngrx/store';
import { Material, MaterialsErrors } from '../../models/folders.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': props<{ folderId: number }>(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: MaterialsErrors }>(),

    'Create Material': props<{ title: string; material_link: string }>(),
    'Create Material Success': props<{ material: Material }>(),
    'Create Material Failure': props<{ error: MaterialsErrors }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: MaterialsErrors }>(),
  },
});
