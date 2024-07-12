import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Material } from '../../models/material.model';
import { MaterialAdd } from '../../models/material-add.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{materials: Material[]}>(),
    'Load Materials Failure': props<{error: Error}>(),

    'Add Material': props<{material: MaterialAdd}>(),
    'Add Material Success': props<{material: Material}>(),
    'Add Material Failure': props<{error: Error}>(),

    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: Error}>(),
  },
});
