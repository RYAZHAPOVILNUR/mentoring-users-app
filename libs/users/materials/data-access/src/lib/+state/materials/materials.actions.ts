import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TMaterialCreate, TMaterialDTO } from '../../models/materials/material-data.models';
import { TMaterialsError } from './materials.reducer';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    // Load Materials
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: TMaterialDTO[] }>(),
    'Load Materials Failure': props<{ error: TMaterialsError }>(),
    // Create Material
    'Create Material': props<{ material: TMaterialCreate }>(),
    'Create Material Success': props<{ material: TMaterialDTO }>(),
    'Create Material Failure': props<{ error: TMaterialsError }>(),
    // Delete Material
    'Delete Material': props<{ material: TMaterialDTO }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: TMaterialsError }>(),
  },
});
