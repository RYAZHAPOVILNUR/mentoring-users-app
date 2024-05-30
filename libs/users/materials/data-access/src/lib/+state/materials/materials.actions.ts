import { createActionGroup, props } from '@ngrx/store';
import { Material } from '../../interfaces/material.interface';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': props<{ id: number }>(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: Error }>()


  }
});


//emptyProps(),