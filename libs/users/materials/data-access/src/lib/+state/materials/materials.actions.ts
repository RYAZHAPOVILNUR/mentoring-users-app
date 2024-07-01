import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialEntity } from '../../interfaces/material-entity.interface';
import { MaterialCreate } from '../../types/material-create.type';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialEntity[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: Error }>(),

    'Create Material': props<{ material: MaterialCreate }>(),
    'Create Material Success': props<{ material: MaterialEntity }>(),
    'Create Material Failure': props<{ error: Error }>(),
    'otsosal': emptyProps()
  }
});