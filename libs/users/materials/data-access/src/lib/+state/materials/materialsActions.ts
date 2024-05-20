import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Material } from '../../interfaces/material.interface';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: Material[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),
  },
});
