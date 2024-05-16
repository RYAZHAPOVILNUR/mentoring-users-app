import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialInterface } from '../../interfaces/material.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialInterface[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),
  },
});
