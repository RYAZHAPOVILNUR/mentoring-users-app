import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/material-add.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{ error: any }>(),

    'Add Material': props<{ material: IAddMaterial }>(),
    'Add Material Success': props<{ material: IMaterial }>(),
    'Add Material Failure': props<{ error: any }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: any }>(),
  },
});
